<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register new user and return token.
     */
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name'         => 'required|string|max:255',
                'email'        => 'required|string|email|max:255|unique:users',
                'password'     => 'required|string|min:6|confirmed',
                'company_id'  => 'nullable|exists:companies,id',
                'company_name' => 'nullable|string|max:255'
            ], [
                'email.unique'        => 'The email has already been taken.',
                'company_id.exists'   => 'The selected company is invalid.'
            ]);

            // Ensure at least one of company_id or company_name is provided
            if (empty($request->company_id) && empty($request->company_name)) {
                return response()->json(['message' => 'Either company or company name is required.'], 422);
            }

            // Ensure only one is provided
            if (!empty($request->company_id) && !empty($request->company_name)) {
                return response()->json(['message' => 'Please provide either company or company name, not both.'], 422);
            }
        } catch (ValidationException $e) {
            $errors = $e->errors();
            $firstError = collect($errors)->flatten()->first();
            return response()->json(['message' => $firstError], 422);
        }

        // If company_name is provided, create a new company
        $companyId = $request->company_id;
        if (!empty($request->company_name)) {
            $domain = strtolower($request->company_name) . '.localhost';
            
            try {
                $company = Company::create([
                    'name' => $request->company_name,
                    'domain' => $domain,
                ]);
                $companyId = $company->id;
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'The company name has already been taken.'
                ], 422);
            }
        }

        $user = User::create([
            'name'       => $request->name,
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
            'company_id' => $companyId,
        ]);

        $user->load('company');
        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user'    => $user,
            'token'   => $token
        ], 201);
    }

    /**
     * Login user and return token.
     */
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email'      => 'required|email',
                'password'   => 'required|string',
                'company_id' => 'required|exists:companies,id'
            ], [
                'company_id.required' => 'The company is required.',
                'company_id.exists'   => 'The selected company is invalid.'
            ]);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            $firstError = collect($errors)->flatten()->first();
            return response()->json(['message' => $firstError], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if ($user->company_id != $request->company_id) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // optionally: revoke previous tokens if you want single-session
        // $user->tokens()->delete();

        $user->load('company');
        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json([
            'message' => 'Logged in successfully',
            'user'    => $user,
            'token'   => $token
        ]);
    }

    /**
     * Return authenticated user.
     */
    public function me(Request $request)
    {
        $user = $request->user();
        $user->load('company');
        return response()->json($user);
    }

    /**
     * Logout (delete current access token).
     */
    public function logout(Request $request)
    {
        $token = $request->user()->currentAccessToken();

        if ($token) {
            $token->delete();
        }

        return response()->json(['message' => 'Logged out']);
    }
}

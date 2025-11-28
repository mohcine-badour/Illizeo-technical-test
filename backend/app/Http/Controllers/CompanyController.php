<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class CompanyController extends Controller
{
    /**
     * Display a listing of all companies.
     */
    public function index(Request $request)
    {
        $companies = Company::latest()->get();

        return response()->json([
            'data' => $companies
        ]);
    }

    /**
     * Store a newly created company.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255'
            ]);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            $firstError = collect($errors)->flatten()->first();
            return response()->json(['message' => $firstError], 422);
        }

        $domain = strtolower($request->name) . '.localhost';

        try {
            $company = Company::create([
                'name' => $request->name,
                'domain' => $domain,
            ]);

            return response()->json([
                'message' => 'Company created successfully',
                'data' => $company
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'The domain has already been taken.'
            ], 422);
        }
    }
}


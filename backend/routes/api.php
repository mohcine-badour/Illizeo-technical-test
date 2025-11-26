<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\AuthController;
use App\Models\User;

Route::post('/login', function(Request $request) {
    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // créer un token
    $token = $user->createToken('API Token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user'  => $user
    ]);
});

Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('/logout', function(Request $request) {
    $request->user()->currentAccessToken()->delete();
    return ['message' => 'Logged out'];
});

Route::middleware('auth:sanctum')->get('/dashboard', function () {
    return "Bienvenue !";
});

Route::post('/hello', function() {
    return "Hello World";
});

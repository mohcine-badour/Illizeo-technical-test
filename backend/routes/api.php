<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\AuthController;
use App\Models\User;
use App\Http\Controllers\NoteController;

// public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
// protected Routes (auth:sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user',      [AuthController::class, 'me']);
    Route::post('/logout',   [AuthController::class, 'logout']);
    Route::get('/dashboard', function () {
        return response()->json(['message' => 'Bienvenue !']);
    });
    Route::apiResource('notes', NoteController::class);
});
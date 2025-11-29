<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\AuthController;
use App\Models\User;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;

// public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
Route::get('/companies', [CompanyController::class, 'index']);
Route::post('/companies', [CompanyController::class, 'store']);
// protected Routes (auth:sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user',      [AuthController::class, 'me']);
    Route::post('/logout',   [AuthController::class, 'logout']);
    Route::apiResource('notes', NoteController::class);
    Route::get('/users',     [UserController::class, 'index']);
});
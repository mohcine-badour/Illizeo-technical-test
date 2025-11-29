<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of users for the active company.
     */
    public function index(Request $request)
    {
        $company = app()->make('company.active');
        
        $users = User::where('company_id', $company->id)
            ->with('notes')
            ->latest()
            ->get();

        return response()->json([
            'data' => $users
        ]);
    }
}


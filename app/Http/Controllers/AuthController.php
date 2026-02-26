<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $auth = auth()->attempt($request->only('email', 'password'));
        if(!$auth) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
        $token = auth()->user()->createToken('auth_token')->plainTextToken;
        return response()->json([
            'token' => $token,
            'message' => 'Login successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logout successfully'
        ]);
    }
}

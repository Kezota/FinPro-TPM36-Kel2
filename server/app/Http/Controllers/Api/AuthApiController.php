<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthApiController extends Controller
{
    public function login(Request $request)
    {
        // Validasi data login
        $request->validate([
            'team_name' => 'required',
            'password' => 'required'
        ]);

        $team = Team::where('team_name', $request->team_name)->first();

        if (!$team || !Auth::attempt(['team_name' => $request->team_name, 'password' => $request->password])) {
            return response()->json(['error' => 'Your credentials are not valid'], 401);
        }


        $token = $team->createToken('TeamAuthToken')->accessToken;

        return response()->json([
            'message' => 'Login successful',
            'team' => $team,
            'access_token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        try {
            if ($request->user()) {
                $request->user()->token()->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Logged out successfully'
                ], 200);
            }
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        } catch (\Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'Logout failed',
                'error' => $error->getMessage()
            ], 500);
        }
    }
}

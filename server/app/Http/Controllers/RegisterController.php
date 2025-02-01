<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\TeamLeader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // Validate team information
        $request->validate([
            'team_name' => 'required|unique:teams,team_name',
            'password' => [
                'required',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*#?&]/'
            ],
            'password_confirmation' => 'required|same:password',
            'is_binusian' => 'required|boolean',
            
            // Leader information
            'full_name' => 'required',
            'email' => 'required|email|unique:team_leaders,email',
            'whatsapp_number' => 'required|min:9|unique:team_leaders,whatsapp_number',
            'line_id' => 'required|unique:team_leaders,line_id',
            'github_id' => 'required',
            'birth_place' => 'required',
            'birth_date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    $age = Carbon::parse($value)->age;
                    if ($age < 17) {
                        $fail('Leader must be at least 17 years old.');
                    }
                },
            ],
            'cv' => 'required|mimes:pdf,jpg,jpeg,png',
            'id_card' => 'required|mimes:pdf,jpg,jpeg,png',
        ]);

        // Create team
        $team = Team::create([
            'team_name' => $request->team_name,
            'password' => Hash::make($request->password),
            'is_binusian' => $request->is_binusian
        ]);

        // Handle file uploads
        $cvPath = $request->file('cv')->store('cv', 'public');
        $idCardPath = $request->file('id_card')->store('id_cards', 'public');

        // Create team leader
        TeamLeader::create([
            'team_id' => $team->id,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'whatsapp_number' => $request->whatsapp_number,
            'line_id' => $request->line_id,
            'github_id' => $request->github_id,
            'birth_place' => $request->birth_place,
            'birth_date' => $request->birth_date,
            'cv_path' => $cvPath,
            'id_card_path' => $idCardPath
        ]);

        return response()->json([
            'message' => 'Registration successful',
            'team' => $team
        ], 201);
    }
}
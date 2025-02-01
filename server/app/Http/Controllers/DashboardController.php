<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getTeamDetails(Request $request)
    {
        $team = Team::with('leader')->findOrFail($request->user()->team_id);
        
        return response()->json([
            'team' => $team,
            'timeline' => [
                'open_registration' => '2025-01-01',
                'close_registration' => '2025-01-31',
                'technical_meeting' => '2025-02-05',
                'competition_day' => '2025-02-10'
            ],
            'contact_person' => [
                'name' => 'Technical Support',
                'email' => 'support@technoscape.com',
                'phone' => '+6281234567890'
            ]
        ]);
    }

    public function viewDocument($type, $filename)
    {
        $path = storage_path('app/public/' . $type . '/' . $filename);
        
        if (!file_exists($path)) {
            abort(404);
        }

        return response()->file($path);
    }
}

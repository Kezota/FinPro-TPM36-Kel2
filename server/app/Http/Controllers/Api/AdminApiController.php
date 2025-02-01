<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class AdminApiController extends Controller
{

    // Registered Team
    public function index()
    {
        $teams = Team::with('teamLeader')->get();

        return response()->json([
            'success' => true,
            'teams' => $teams,
        ], 200);
    }

    // Team Details
    public function show($id)
    {
        $team = Team::with('teamLeader')->find($id);

        if (!$team) {
            return response()->json(['success' => false, 'message' => 'Team not found'], 404);
        }

        return response()->json([
            'success' => true,
            'team' => $team,
        ], 200);
    }

    // Update team
    public function update(Request $request, $id)
    {
        $request->validate([
            'team_name' => 'required|unique:teams,team_name,' . $id,
            'is_binusian' => 'required|boolean',
            'full_name' => 'required',
            'email' => 'required|email',
        ]);

        $team = Team::findOrFail($id);

        $team->update([
            'team_name' => $request->team_name,
            'is_binusian' => $request->is_binusian,
        ]);

        $team->teamLeader->update([
            'full_name' => $request->full_name,
            'email' => $request->email,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Team updated successfully',
            'team' => $team,
        ], 200);
    }

    // Delete team
    public function destroy($id)
    {
        $team = Team::find($id);

        if (!$team) {
            return response()->json(['success' => false, 'message' => 'Team not found'], 404);
        }

        $team->teamLeader()->delete();
        $team->delete();

        return response()->json([
            'success' => true,
            'message' => 'Team deleted successfully',
        ], 200);
    }
}

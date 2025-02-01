<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //View
    public function index()
    {
        $teams = Team::with('teamLeader')->get();
        return view('admin.dashboard', compact('teams'));
    }

    //Detail
    public function show($id)
    {
        $team = Team::with('teamLeader')->findOrFail($id);
        return view('admin.team_details', compact('team'));
    }

    //Edit
    public function edit($id)
    {
        $team = Team::with('teamLeader')->findOrFail($id);
        return view('admin.edit_team', compact('team'));
    }

    //Upd
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

        return redirect()->route('admin.index')->with('success', 'Team updated successfully');
    }

    //Del
    public function delete($id)
    {
        $team = Team::findOrFail($id);
        $team->teamLeader()->delete();
        $team->delete();
        return response()->json([
            'success'=>true,
            'message'=>'Team data has been deleted succesfully'
        ],200);
    }
}

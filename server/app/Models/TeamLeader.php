<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamLeader extends Model
{
    protected $fillable = [
        'team_id',
        'full_name',
        'email',
        'whatsapp_number',
        'line_id',
        'github_id',
        'birth_place',
        'birth_date',
        'cv_path',
        'id_card_path'
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
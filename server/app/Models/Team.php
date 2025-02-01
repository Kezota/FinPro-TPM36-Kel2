<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'team_name',
        'password',
        'is_binusian'
    ];

    protected $hidden = [
        'password'
    ];

    public function leader()
    {
        return $this->hasOne(TeamLeader::class);
    }
}
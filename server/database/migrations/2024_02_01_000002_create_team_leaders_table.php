<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamLeadersTable extends Migration
{
    public function up()
    {
        Schema::create('team_leaders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->onDelete('cascade');
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('whatsapp_number')->unique();
            $table->string('line_id')->unique();
            $table->string('github_id');
            $table->string('birth_place');
            $table->date('birth_date');
            $table->string('cv_path');
            $table->string('id_card_path');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('team_leaders');
    }
}
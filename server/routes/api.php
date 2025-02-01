<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;

Route::post('/register', [RegisterController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'getTeamDetails']);
    Route::get('/document/{type}/{filename}', [DashboardController::class, 'viewDocument']);
});
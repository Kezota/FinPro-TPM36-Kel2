<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeamController;

use Illuminate\Support\Facades\Route;


// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/login', [AuthController::class,'ShowLoginForm'])->name('login');
Route::post('/login', [AuthController::class,'Login'])->name('loginStore');
Route::get('/logout', [AuthController::class,'ShowLogoutForm'])->name('logout');
Route::post('/logout', [AuthController::class,'logout'])->name('logoutStore');

Route::middleware('auth.admin')->group(function () {
    Route::resource('teams', TeamController::class);
});


<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\AdminController;
use Illuminate\Support\Facades\Route;


// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/login', [AuthController::class,'ShowLoginForm'])->name('login');
Route::post('/login', [AuthController::class,'Login'])->name('loginStore');
Route::get('/logout', [AuthController::class,'ShowLogoutForm'])->name('logout');
Route::post('/logout', [AuthController::class,'logout'])->name('logoutStore');


Route::get('/admin', [AdminController::class, 'index'])->middleware('IsAdminMiddleware')->name('admin.index');
Route::get('/admin/team/{id}', [AdminController::class, 'show'])->middleware('IsAdminMiddleware')->name('admin.team.show');
Route::get('/admin/team/{id}/edit', [AdminController::class, 'edit'])->middleware('IsAdminMiddleware')->name('admin.team.edit');
Route::put('/admin/team/{id}', [AdminController::class, 'update'])->middleware('IsAdminMiddleware')->name('admin.team.update');
Route::delete('/admin/team/{id}', [AdminController::class, 'destroy'])->middleware('IsAdminMiddleware')->name('admin.team.destroy');


Route::middleware('auth.admin')->group(function () {
    Route::resource('teams', AdminController::class);
});


<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::delete('/logout', [AuthController::class, 'destroy']);

    
    // Student Classes
    Route::get('/student-classes', [StudentClassController::class, 'index']);
    Route::post('/student-classes', [StudentClassController::class, 'store']);
    Route::get('/student-classes/{studentClass}/edit', [StudentClassController::class, 'edit']);
    Route::put('/student-classes/{studentClass}', [StudentClassController::class, 'update']);
    Route::delete('/student-classes/{studentClass}', [StudentClassController::class, 'destroy']);
    // Students
    Route::get('/students', [StudentController::class, 'index']);
    Route::post('/students', [StudentController::class, 'store']);
    Route::delete('/students/{student}', [StudentController::class, 'destroy']);
});


// Authentication
Route::post('/auth/login', [AuthController::class, 'store']);

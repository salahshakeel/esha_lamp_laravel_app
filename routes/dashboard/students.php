<?php
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::resource('students', \App\Http\Controllers\StudentController::class);
    Route::get('students/{student}/books', [\App\Http\Controllers\StudentController::class, 'BookIndex'])->name('students.books.index');
});


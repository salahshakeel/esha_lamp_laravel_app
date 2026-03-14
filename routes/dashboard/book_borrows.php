<?php
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::resource('borrows', \App\Http\Controllers\BookBorrowController::class);
});
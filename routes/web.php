<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\BookBorrow;
use App\Models\Book;
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $counts = [
        'students' => Student::count(),
        'books' => Book::count(),
        'borrows' => BookBorrow::count(),
    ];
    $recentBorrows = BookBorrow::with([
                'student',
                'books',
                'books.categories'
            ])
            ->whereDate('borrowed_at', '>=', now()->subDays(7)) // Get borrows from the last 7 days
            ->latest()->paginate(10);
    return Inertia::render('Dashboard', [
        'counts' => $counts,
        'recentBorrows' => $recentBorrows,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/dashboard/students.php';
require __DIR__.'/dashboard/books.php';
require __DIR__.'/dashboard/book_categories.php';
require __DIR__.'/dashboard/book_borrows.php';
require __DIR__.'/dashboard/notifications.php';

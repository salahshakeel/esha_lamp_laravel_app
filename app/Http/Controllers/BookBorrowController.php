<?php

namespace App\Http\Controllers;

use App\Models\BookBorrow;
use App\Models\Student;
use App\Models\Book;
use App\Http\Requests\StoreBookBorrowRequest;
use App\Http\Requests\UpdateBookBorrowRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Notification;
class BookBorrowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Borrows/Index', [
            'borrows' =>BookBorrow::with([
                'student',
                'books',
                'books.categories'
            ])->latest()->paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         $books = Book::with(['studentBorrows', 'studentBorrows.borrows'])
        ->get()
        ->filter(function ($book) {
            // Check if any borrow exists and is not returned
            foreach ($book->studentBorrows as $studentBorrow) {
                foreach ($studentBorrow->borrows as $borrow) {
                    if (!$borrow->is_returned) {
                        return false; // Book is currently borrowed
                    }
                }
            }
            return true; // No active borrows found
        })
        ->values(); // Reset keys

        $students = Student::all();
        return Inertia::render('Borrows/Create', [
            'books' => $books,
            'students' => $students,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookBorrowRequest $request)
    {
        $student = Student::findOrFail($request->student_id);
       
        $borrow = BookBorrow::create([
            'student_id' => $request->student_id,
            'borrower_name' => $student->name,
            'borrower_email' => $student->email,
            'borrower_phone' => $student->phone,
            'borrower_class' => $student->class,
            'book_title' => Book::whereIn('id', $request->book_ids)->pluck('title')->join(', '),
            'book_author' => Book::whereIn('id', $request->book_ids)->pluck('author')->join(', '),
            'borrowed_at' => now(),
        ]);
         $student->books()->attach($request->book_ids, ['borrow_id' => $borrow->id ]);
        // $borrow->notify(new \App\Notifications\BorrowStatusNotification($borrow,$student));
        Notification::route('mail', 'salahshakeel0@gmail.com')
        ->notify(new \App\Notifications\BorrowStatusNotification($borrow, $student));
        return redirect()->route('dashboard.borrows.index')->with('success', 'Book borrow created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BookBorrow $bookBorrow)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookBorrow $bookBorrow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookBorrowRequest $request, BookBorrow $borrow)
    {
        $borrow->update([
            'is_returned' => true,
            'returned_at' => now(),
        ]);
       // $borrow->notify(new \App\Notifications\BorrowStatusNotification($borrow,  $borrow->student));
       Notification::route('mail', 'salahshakeel0@gmail.com')
        ->notify(new \App\Notifications\BorrowStatusNotification($borrow, $borrow->student));
        return redirect()->route('dashboard.borrows.index')->with('success', 'Book borrow updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookBorrow $borrow)
    {
        $borrow->student->books()->wherePivot('borrow_id', $borrow->id)->detach();
        $borrow->delete();
        return redirect()->route('dashboard.borrows.index')->with('success', 'Book borrow deleted successfully.');
    }
}

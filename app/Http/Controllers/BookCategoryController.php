<?php

namespace App\Http\Controllers;

use App\Models\BookCategory;
use App\Http\Requests\StoreBookCategoryRequest;
use App\Http\Requests\UpdateBookCategoryRequest;
use Inertia\Inertia;
class BookCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $book_categories = BookCategory::latest()->paginate(10);
        return Inertia::render('BookCategories/Index', compact('book_categories'));
    }

    public function BookIndex(BookCategory $category)
    {
        $books = $category->books()->latest()->paginate(10);
        return Inertia::render('BookCategories/BookIndex', compact('books', 'category'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('BookCategories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookCategoryRequest $request)
    {
        BookCategory::create($request->validated());
        return redirect()->route('dashboard.book_categories.index')->with('success', 'Book category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BookCategory $bookCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookCategory $bookCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookCategoryRequest $request, BookCategory $bookCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookCategory $bookCategory)
    {
        $bookCategory->delete();
        return redirect()->route('dashboard.book_categories.index')->with('success', 'Book category deleted successfully.');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany; 
class Book extends Model
{
    /** @use HasFactory<\Database\Factories\BookFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'description',
    ];

     public function categories(): BelongsToMany
    {
        return $this->belongsToMany(
            BookCategory::class,
            'book_category_book', // pivot table
            'book_id',
            'category_id'
        );
    }

    public function studentBorrows(): BelongsToMany
    {
        return $this->belongsToMany(
            Student::class,
            'book_student', // pivot table
            'book_id',
            'student_id'
        );
    }
    
}

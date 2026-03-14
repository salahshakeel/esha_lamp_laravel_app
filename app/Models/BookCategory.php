<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookCategory extends Model
{
    /** @use HasFactory<\Database\Factories\BookCategoryFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
    ];

    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_category_book', 'category_id', 'book_id');
    }
}

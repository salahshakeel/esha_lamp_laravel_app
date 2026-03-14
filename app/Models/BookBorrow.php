<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
class BookBorrow extends Model
{
    /** @use HasFactory<\Database\Factories\BookBorrowFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'student_id',
        'borrower_name',
        'borrower_email',
        'borrower_phone',
        'borrower_class',
        'book_title',
        'book_author',
        'borrowed_at',
        'returned_at',
        'is_returned',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_student', 'borrow_id', 'book_id')
            ->withPivot('student_id');
    }

    
    
}

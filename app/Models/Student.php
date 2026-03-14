<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'class',
    ];

      public function books()
    {
        return $this->belongsToMany(Book::class, 'book_student')
                    ->withPivot('borrow_id');
    }

    public function borrows()
    {
        return $this->hasMany(BookBorrow::class);
    }


}

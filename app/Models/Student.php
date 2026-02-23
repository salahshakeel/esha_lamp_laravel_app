<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'father_name',
        'address',
        'email',
        'phone',
        'class_id',
    ];

    public function studentClass()
    {
        return $this->belongsTo(StudentClass::class, 'class_id');
    }
}

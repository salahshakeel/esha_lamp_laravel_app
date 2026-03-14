<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use Inertia\Inertia;
class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    private $students_classes = [
        'Class 1',
        'Class 2', 
        'Class 3', 
        'Class 4', 
        'Class 5', 
        'Class 6', 
        'Class 7', 
        'Class 8', 
        'Class 9', 
        'Class 10'
    ];

    public function index()
    {
        $students = Student::latest()->paginate(10);
        return Inertia::render('Students/Index', [
            'students' => $students
        ]);
    }
    public function BookIndex(Student $student)
    {
        return Inertia::render('Students/BooksIndex',[
            'books' => $student->borrows()
            ->with(['books', 'books.categories'])
            ->latest()
            ->paginate(10)
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      
        return Inertia::render('Students/Create', [
            'students_classes' => $this->students_classes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        Student::create($request->validated());
        return redirect()->route('dashboard.students.index')->with('success', 'Student created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        return Inertia::render('Students/Create', [
            'students_classes' => $this->students_classes,
            'student' => $student
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());
        return redirect()->route('dashboard.students.index')->with('success', 'Student updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();
        session()->flash('success', 'Student deleted successfully.');
    }
}

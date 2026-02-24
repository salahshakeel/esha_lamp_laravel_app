<?php

namespace App\Http\Controllers;

use App\Models\StudentClass;
use App\Http\Requests\StoreStudentClassRequest;
use App\Http\Requests\UpdateStudentClassRequest;

class StudentClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $studentClasses = StudentClass::all();
        return response()->json($studentClasses);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentClassRequest $request)
    {
        $studentClass = StudentClass::create($request->validated());
        return response()->json([
            'student_class' => $studentClass,
            'message' => 'Student class created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentClass $studentClass)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentClass $studentClass)
    {
        return response()->json($studentClass);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentClassRequest $request, StudentClass $studentClass)
    {
        $studentClass->update($request->validated());
        return response()->json([
            'student_class' => $studentClass,
            'message' => 'Student class updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentClass $studentClass)
    {
        $studentClass->delete();
        return response()->json([
            'message' => 'Student class deleted successfully'
        ]);
    }
}

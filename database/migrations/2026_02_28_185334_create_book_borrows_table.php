<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('book_borrows', function (Blueprint $table) {
            $table->id();
            $table->string('borrower_name');
            $table->string('borrower_email');
            $table->string('borrower_phone');
            $table->string('borrower_class');
            $table->string('book_title');
            $table->string('book_author');
            $table->date('borrowed_at');
            $table->unsignedBigInteger('student_id');
            $table->date('returned_at')->nullable();
            $table->boolean('is_returned')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_borrows');
    }
};

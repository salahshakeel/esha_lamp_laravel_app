import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm } from '@inertiajs/react'
import React from 'react'

const Create = ({books,students}) => {

   const { data, setData, post, processing, errors } = useForm({
        student_id: '',
        book_ids: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.borrows.store'));
    };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Book Borrow</h2>}
    >
        <Head title="Create Book Borrow" />
        <div className='mx-auto max-w-screen-xl px-4 lg:px-12 py-12'>

            <form onSubmit={submit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="mb-6">
                    <InputLabel htmlFor="student_id" value="Student" />
                    <select
                        id="student_id"
                        name="student_id"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.student_id}
                        onChange={(e) => setData('student_id', e.target.value)}
                    >
                        <option value="">Select Student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                      <div className="mb-6">
                    {errors.student_id && <div className="text-red-500 text-sm mt-1">{errors.student_id}</div>}
                </div>
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="book_ids" value="Books" />
                    <select
                        id="book_ids"
                        name="book_ids"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.book_ids}
                        onChange={(e) => setData('book_ids', Array.from(e.target.selectedOptions, (option) => option.value))}
                        multiple
                    >
                        {books.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    {errors.book_ids && <div className="text-red-500 text-sm mt-1">{errors.book_ids}</div>}
                </div>
                
          
                <PrimaryButton type="submit" disabled={processing} className="w-full md:w-auto">
                    {processing ? 'Creating...' : 'Create'}
                </PrimaryButton>

                <SecondaryButton className="ml-2" onClick={() => window.history.back()}>Cancel</SecondaryButton>
            </form>

        </div>
    </AuthenticatedLayout>
  )
}

export default Create
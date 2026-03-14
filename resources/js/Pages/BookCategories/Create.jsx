import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm } from '@inertiajs/react'
import React from 'react'

const Create = () => {

   const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.book_categories.store'));
    };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Book Category</h2>}
    >
        <Head title="Create Book Category" />
        <div className='mx-auto max-w-screen-xl px-4 lg:px-12 py-12'>

            <form onSubmit={submit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="mb-6">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput id="name" name="name" type="text" className="mt-1 block w-full" 
                    value={data.name}
                    autoFocus 
                    onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
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
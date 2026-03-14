import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm } from '@inertiajs/react'
import React from 'react'

const Create = ({ students_classes,student }) => {

   const { data, setData, post, processing, errors } = useForm({
        name: student?.name || '',
        email: student?.email || '',
        phone: student?.phone || '',
        address: student?.address || '',
        class: student?.class || 'Class 1',
    });

    const submit = (e) => {
        e.preventDefault();
        if(student) {
            router.put(route('dashboard.students.update', student.id), data);
        } else {
            post(route('dashboard.students.store'));
        }
    };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{student ? 'Edit' : 'Create'} Student</h2>}
    >
        <Head title={student ? "Edit Student" : "Create Student"} />
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
                
                <div className="mb-6">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" name="email" type="email" className="mt-1 block w-full"  
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                </div>

                   <div className="mb-6">
                    <InputLabel htmlFor="phone" value="Phone" />
                    <TextInput id="phone" name="phone" type="text" className="mt-1 block w-full" 
                    value={data.phone} 
                    onChange={(e) => setData('phone', e.target.value)}
                    />
                    {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="address" value="Address" />
                    <TextInput id="address" name="address" type="text" className="mt-1 block w-full"  
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    />
                    {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="class_id" value="Class" />
                    <select
                    onChange={(e)=>setData('class',e.target.value)}
                    id="class" name="class" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        {students_classes.map((cls) => (
                            <option key={cls} value={cls} selected={data.class === cls}>{cls}</option>
                        ))}
                    </select>
                    {errors.class && <div className="text-red-500 text-sm mt-1">{errors.class}</div>}
                </div>
                <PrimaryButton type="submit" disabled={processing} className="w-full md:w-auto">
                    {processing ? student ? 'Updating...' : 'Creating...' : student ? 'Update' : 'Create'}
                </PrimaryButton>

                <SecondaryButton className="ml-2" onClick={() => window.history.back()}>Cancel</SecondaryButton>
            </form>

        </div>
    </AuthenticatedLayout>
  )
}

export default Create
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm } from '@inertiajs/react'
import React from 'react'

const Create = ({categories,book}) => {

   const { data, setData, post, processing, errors } = useForm({
        title: book ? book.title : '',
        author: book ? book.author : '',
        description: book ? book.description : '',
        category_ids: book ? book.category_ids : [],
    });

    const submit = (e) => {
        e.preventDefault();
        if(book) {
            router.put(route('dashboard.books.update', book.id),data);
            return;
        }
        post(route('dashboard.books.store'));
    };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{book ? 'Edit' : 'Create'} Book</h2>}
    >
        <Head title={book ? 'Edit Book' : 'Create Book'} />
        <div className='mx-auto max-w-screen-xl px-4 lg:px-12 py-12'>

            <form onSubmit={submit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="mb-6">
                    <InputLabel htmlFor="title" value="Title" />
                    <TextInput id="title" name="title" type="text" className="mt-1 block w-full" 
                    value={data.title}
                    autoFocus 
                    onChange={(e) => setData('title', e.target.value)}
                    />
                    {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                </div>
                
                <div className="mb-6">
                    <InputLabel htmlFor="author" value="Author" />
                    <TextInput id="author" name="author" type="text" className="mt-1 block w-full" 
                    value={data.author}
                    onChange={(e) => setData('author', e.target.value)}
                    />
                    {errors.author && <div className="text-red-500 text-sm mt-1">{errors.author}</div>}
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="description" value="Description" />
                    <TextInput id="description" name="description" type="text" className="mt-1 block w-full" 
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                </div>

                <div className="mb-6">
                  <InputLabel htmlFor="category_ids" value="Categories" />
                  <select
                      id="category_ids"
                      name="category_ids"
                      multiple
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={data.category_ids}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                        setData('category_ids', selected);
                      }}
                  >
                      {categories.map(category => (
                          <option key={category.id} value={category.id}>
                              {category.name}
                          </option>
                      ))}
                  </select>
                  {errors.category_ids && <div className="text-red-500 text-sm mt-1">{errors.category_ids}</div>}
                </div>
          
                <PrimaryButton type="submit" disabled={processing} className="w-full md:w-auto">
                    {processing ? book ? 'Updating...' : 'Creating...' : book ? 'Update' : 'Create'}
                </PrimaryButton>

                <SecondaryButton className="ml-2" onClick={() => window.history.back()}>Cancel</SecondaryButton>
            </form>

        </div>
    </AuthenticatedLayout>
  )
}

export default Create
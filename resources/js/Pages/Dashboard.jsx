import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({counts,recentBorrows}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

          <div className="py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Students Card */}
                <div className="bg-white p-6 border rounded-lg shadow-sm">
                <h5 className="mb-2 text-2xl font-semibold">Students</h5>
                <p className="text-2xl font-bold">{counts.students}</p>
                <p className="text-gray-600 mb-4">Manage all registered students in the system.</p>
                <Link  href={route('dashboard.students.index')} className="px-4 py-2 bg-black text-white rounded ">
             
                    View Students
               
                </Link>
                </div>

                {/* Books Card */}
                <div className="bg-white p-6 border rounded-lg shadow-sm">
                <h5 className="mb-2 text-2xl font-semibold">Books</h5>
                <p className="text-2xl font-bold">{counts.books}</p>
                <p className="text-gray-600 mb-4">Browse and manage all books in the library.</p>
                <Link  href={route('dashboard.books.index')} className="px-4 py-2 bg-black text-white rounded ">
             
                    View Books
               
                </Link>
                </div>

                {/* Borrows Card */}
                <div className="bg-white p-6 border rounded-lg shadow-sm">
                <h5 className="mb-2 text-2xl font-semibold">Borrows</h5>
                <p className="text-2xl font-bold">{counts.borrows}</p>
                <p className="text-gray-600 mb-4">Track borrowed books and return dates.</p>
                <Link  href={route('dashboard.borrows.index')} className="px-4 py-2 bg-black text-white rounded ">
             
                    View Borrows
               
                </Link>
                </div>

            </div>

            </div>

        <div className="py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  <h2 className="text-2xl font-bold mb-4">Recent Borrows</h2>

  <ul className="bg-white shadow-sm sm:rounded-lg p-4 divide-y">

    {recentBorrows?.data?.map((borrow) => (
      <li key={borrow.id} className="py-3">
        <div className="flex items-center justify-between">

          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <div className="shrink-0">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                👤
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                {borrow.borrower_name}
              </p>
              <p className="text-sm text-gray-500">
                {borrow.borrower_email}
              </p>
              <p className="text-xs text-gray-400">
                {borrow.borrower_class}
              </p>
            </div>
          </div>

          {/* Middle - Books */}
          <div className="hidden md:block text-sm text-gray-600">
            {borrow.book_title}
          </div>

          {/* Right Side */}
          <div className="text-right">
            <p className="text-sm font-medium">
              {borrow.borrowed_at}
            </p>

            <span
              className={`text-xs px-2 py-1 rounded ${
                borrow.is_returned
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {borrow.is_returned ? "Returned" : "Borrowed"}
            </span>
          </div>

        </div>
      </li>
    ))}

  </ul>
</div>

        </AuthenticatedLayout>
    );
}

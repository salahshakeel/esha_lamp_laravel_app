import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import React from 'react'
import moment from 'moment'
import { Pagination } from '@/Components/Pagination'
const Index = ({ notifications }) => {

  const items = notifications.data

  const updateNotification = (notification) => {
    router.put(route('dashboard.notifications.update', notification.id))
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Notifications
        </h2>
      }
    >
      <Head title="Notifications" />

      <div className="py-8">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">

          <div className="bg-white shadow-sm rounded-lg border border-gray-200">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-700">
                Recent Notifications
              </h3>

              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {items.filter(n => !n.read_at).length} Unread
              </span>
            </div>

            {/* Notifications */}
            <div className="divide-y">

              {items.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No notifications found
                </div>
              )}

              {items.map((notification) => {

                const data = notification.data

                return (
                <button className='w-full text-left' onClick={() => updateNotification(notification)}>
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition ${
                      !notification.read_at ? "bg-blue-50" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        📚
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {data.book_title} - {data.status}
                      </p>

                      <p className="text-sm text-gray-600">
                        Borrow ID: {data.borrow_id} | Student Name: {data.student_name}
                      </p>

                      <span className="text-xs text-gray-400">
                        {moment(notification.created_at).fromNow()}
                      </span>
                    </div>

                    {/* Unread Dot */}
                    {!notification.read_at && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                    )}
                  </div>
                  </button>
                )
              })}
            </div>

            <Pagination data={notifications} />

          </div>

        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Index
import { Link } from '@inertiajs/react'
import React from 'react'

export const Pagination = ({data}) => {
  return (
                  <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
    
                <span className="text-sm text-gray-500">
                    Showing {data.from} to {data.to} of {data.total}
                </span>

                <ul className="inline-flex items-center -space-x-px">
                    {data.links.map((link, index) => (
                        <li key={index}>
                            <Link
                                href={link.url || ''}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-2 text-sm border ${
                                    link.active
                                        ? 'bg-black text-white'
                                        : 'bg-white text-gray-500'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
  )
}

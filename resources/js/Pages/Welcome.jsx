import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Library Management System" />

            <div className="min-h-screen bg-gray-50 text-gray-800">

                {/* NAVBAR */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-blue-600">
                            LibraryMS
                        </h1>

                        <div className="flex gap-4">
                            {auth?.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="px-4 py-2 text-gray-700 hover:text-blue-600"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href={route("register")}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* HERO SECTION */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                        <div>
                            <h1 className="text-5xl font-bold leading-tight">
                                Smart Library
                                <span className="text-blue-600"> Management System</span>
                            </h1>

                            <p className="mt-6 text-lg text-gray-600">
                                Manage books, students, borrowing records, and
                                notifications in one powerful platform designed
                                for modern libraries.
                            </p>

                            <div className="mt-8 flex gap-4">
                                <Link
                                    href={route("login")}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Get Started
                                </Link>

                                <a
                                    href="#features"
                                    className="px-6 py-3 border rounded-lg hover:bg-gray-100"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>

                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                                className="rounded-xl shadow-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* FEATURES */}
                <section id="features" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6">

                        <h2 className="text-3xl font-bold text-center">
                            System Features
                        </h2>

                        <p className="text-center text-gray-600 mt-4">
                            Everything you need to manage your library efficiently
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

                            <Feature
                                title="Book Management"
                                desc="Add, edit, delete, and categorize books with detailed records."
                                icon="📚"
                            />

                            <Feature
                                title="Borrow & Return"
                                desc="Track borrowing and returning of books easily."
                                icon="🔄"
                            />

                            <Feature
                                title="Student Management"
                                desc="Manage student accounts and borrowing history."
                                icon="👨‍🎓"
                            />

                            <Feature
                                title="Notifications"
                                desc="Send alerts for due dates, returns, and system updates."
                                icon="🔔"
                            />

                            <Feature
                                title="Reports"
                                desc="Generate detailed library activity and usage reports."
                                icon="📊"
                            />

                            <Feature
                                title="Secure System"
                                desc="Role-based access and secure authentication."
                                icon="🔐"
                            />

                        </div>
                    </div>
                </section>

                {/* MODULES */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6">

                        <h2 className="text-3xl font-bold text-center">
                            Library Modules
                        </h2>

                        <div className="grid md:grid-cols-4 gap-8 mt-12 text-center">

                            <Module name="Books" icon="📚" />
                            <Module name="Students" icon="👨‍🎓" />
                            <Module name="Borrow Records" icon="📄" />
                            <Module name="Notifications" icon="🔔" />

                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-blue-600 text-white text-center">
                    <h2 className="text-3xl font-bold">
                        Start Managing Your Library Today
                    </h2>

                    <p className="mt-4 text-blue-100">
                        Efficiently organize books, students, and borrowing records.
                    </p>

                    <div className="mt-8">
                        <Link
                            href={route("register")}
                            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100"
                        >
                            Create Account
                        </Link>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="py-6 text-center text-gray-500">
                    © {new Date().getFullYear()} Library Management System
                </footer>

            </div>
        </>
    );
}

function Feature({ title, desc, icon }) {
    return (
        <div className="p-6 rounded-xl border hover:shadow-md transition">
            <div className="text-4xl">{icon}</div>

            <h3 className="mt-4 text-xl font-semibold">
                {title}
            </h3>

            <p className="text-gray-600 mt-2">
                {desc}
            </p>
        </div>
    );
}

function Module({ name, icon }) {
    return (
        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-4xl">{icon}</div>
            <h3 className="mt-4 font-semibold">{name}</h3>
        </div>
    );
}
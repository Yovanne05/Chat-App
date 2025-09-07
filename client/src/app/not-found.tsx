import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-white px-6 w-full">
            <h1 className="text-9xl font-extrabold text-secondary tracking-widest">404</h1>
            <div className="bg-secondary px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>

            <p className="mt-10 text-lg text-gray-300">
                Oups... la page que vous cherchez n’existe pas ou a été déplacée.
            </p>

            <Link
                href="/"
                className="mt-8 inline-block px-6 py-3 text-sm font-medium text-gray-900 bg-white rounded-2xl shadow-md hover:bg-gray-200 transition"
            >
                ⬅ Retour à l’accueil
            </Link>
        </div>
    )
}

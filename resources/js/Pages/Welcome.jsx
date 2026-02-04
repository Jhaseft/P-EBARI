import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-white">
                <h1 className="text-5xl font-bold mb-4">¡Bienvenido!</h1>
                <p className="text-lg mb-6">Tu aplicación está lista para usar.</p>

                {!auth.user ? (
                    <div className="flex gap-4 mt-6">
                        <Link
                            href="/login"
                            className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-100 transition"
                        >
                            Iniciar Sesión
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-100 transition"
                        >
                            Registrarse
                        </Link>
                    </div>
                ) : (
                    <>
                        <p className="mt-6 text-xl ">
                            Hola, <span className="font-semibold">{auth.user.name}</span> 👋

                        </p>
                        <Link
                            href="/dashboard"
                            className="px-6 py-3 mt-5 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-100 transition"
                        >
                            Dashboard
                        </Link>

                    </>


                )}
            </div>
        </>
    );
}

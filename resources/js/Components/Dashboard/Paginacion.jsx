export default function Paginacion({ links }) {
    if (!links) return null;

    return (
        <div className="mt-4 flex gap-2 justify-center flex-wrap">
            {links.map((link, index) => {
                // link.url puede ser null (por ejemplo, "..." en la paginación)
                if (!link.url) {
                    return (
                        <span
                            key={index}
                            className="px-3 py-1 border rounded bg-gray-200 text-gray-500"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                // Convertimos URL completa a relativa (para evitar problemas con HTTPS)
                const url = new URL(link.url).pathname + new URL(link.url).search;

                return (
                    <a
                        key={index}
                        href={url}
                        className={`px-3 py-1 border rounded ${
                            link.active
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}

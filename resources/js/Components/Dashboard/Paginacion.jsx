import { router } from '@inertiajs/react';

export default function Paginacion({ links }) {
    if (!links) return null;

    return (
        <div className="mt-4 flex gap-2 justify-center flex-wrap">
            {links.map((link, index) => (
                <button
                    key={index}
                    className={`px-3 py-1 border rounded ${
                        link.active ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

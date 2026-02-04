export default function ProductoFila({ producto, onEditar, onEliminar }) {
    return (
        <tr className="border-b hover:bg-gray-100">
            <td className="py-2 px-2 sm:px-4 border">{producto.id}</td>
            <td className="py-2 px-2 sm:px-4 border">{producto.producto}</td>
            <td className="py-2 px-2 sm:px-4 border">{producto.variante || '-'}</td>
            <td className="py-2 px-2 sm:px-4 border">{producto.precio_min || '-'}</td>
            <td className="py-2 px-2 sm:px-4 border">{producto.precio_max || '-'}</td>
            <td className="py-2 px-2 sm:px-4 border">{producto.stock}</td>
            <td className="py-2 px-2 sm:px-4 border">{producto.descripcion || '-'}</td>
            <td className="py-2 px-2 sm:px-4 border">
                {producto.imagen ? (
                    <img src={producto.imagen} alt={producto.producto} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                ) : '-'}
            </td>
            <td className="py-2 px-2 sm:px-4 border flex flex-col sm:flex-row gap-2">
                <button
                    onClick={() => onEditar(producto)}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm sm:text-base text-center"
                >
                    Editar
                </button>
                <button
                    onClick={() => onEliminar(producto.id)}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm sm:text-base text-center"
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}

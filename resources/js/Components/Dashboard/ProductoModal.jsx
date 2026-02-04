export default function ProductoModal({ form, setForm, productoEditar, cerrarModal, guardarProducto }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <h2 className="text-lg font-bold mb-4">{productoEditar ? 'Editar Producto' : 'Crear Producto'}</h2>

                <div className="flex flex-col gap-2">
                    {['producto','variante','precio_min','precio_max','stock','descripcion','imagen'].map((campo) => (
                        <input
                            key={campo}
                            type={campo.includes('precio') || campo === 'stock' ? 'number' : 'text'}
                            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
                            value={form[campo]}
                            onChange={e => setForm({...form, [campo]: e.target.value})}
                            className="border px-2 py-1 rounded"
                        />
                    ))}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={cerrarModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                    <button onClick={guardarProducto} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                        {productoEditar ? 'Guardar' : 'Crear'}
                    </button>
                </div>
            </div>
        </div>
    );
}

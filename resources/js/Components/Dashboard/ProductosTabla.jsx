import ProductoFila from './ProductoFila';

export default function ProductosTabla({ productos, onEditar, onEliminar }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-green-500 text-white">
                        {['ID','Producto','Variante','Precio Min','Precio Max','Stock','Descripción','Imagen','Acciones'].map(h => (
                            <th key={h} className="py-2 px-4 border">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <ProductoFila key={p.id} producto={p} onEditar={onEditar} onEliminar={onEliminar} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

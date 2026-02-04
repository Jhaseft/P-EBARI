import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

import ProductosTabla from '@/Components/Dashboard/ProductosTabla';
import ProductoModal from '@/Components/Dashboard/ProductoModal';
import Paginacion from '@/Components/Dashboard/Paginacion';

export default function Dashboard({ productos, filters }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [productoEditar, setProductoEditar] = useState(null);
    const [search, setSearch] = useState(filters.search || '');

    const [form, setForm] = useState({
        producto: '',
        variante: '',
        precio_min: '',
        precio_max: '',
        stock: '',
        descripcion: '',
        imagen: ''
    });

    // Modal
    const abrirModalCrear = () => {
        setProductoEditar(null);
        setForm({
            producto: '',
            variante: '',
            precio_min: '',
            precio_max: '',
            stock: '',
            descripcion: '',
            imagen: ''
        });
        setModalVisible(true);
    };

    const abrirModalEditar = (p) => {
        setProductoEditar(p);
        setForm({
            producto: p.producto || '',
            variante: p.variante || '',
            precio_min: p.precio_min || '',
            precio_max: p.precio_max || '',
            stock: p.stock || '',
            descripcion: p.descripcion || '',
            imagen: p.imagen || ''
        });
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
        setProductoEditar(null);
    };

    const guardarProducto = async () => {
        try {
            if (productoEditar) {
                const { data } = await axios.put(`/productos/${productoEditar.id}`, form);
                router.reload({ preserveState: true });
            } else {
                const { data } = await axios.post('/productos', form);
                router.reload({ preserveState: true });
            }
            cerrarModal();
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Ocurrió un error al guardar el producto.');
        }
    };
 
    const handleEliminar = async (id) => {
        if (!confirm('¿Deseas eliminar este producto?')) return;
        try {
            await axios.delete(`/productos/${id}`);
            router.reload({ preserveState: true });
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('Ocurrió un error al eliminar el producto.');
        }
    };

    // Manejar búsqueda
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard', { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                                <h3 className="text-lg font-bold">Productos</h3>
                                <button
                                    onClick={abrirModalCrear}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                >
                                    Agregar Producto
                                </button>
                            </div>

                          
                            <form onSubmit={handleSearch} className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Buscar producto o variante..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="border px-2 py-1 rounded w-full sm:w-1/3"
                                />
                                <button
                                    type="submit"
                                    className="ml-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                    Buscar
                                </button>
                            </form>

                              <ProductosTabla
                                productos={productos.data}
                                onEditar={abrirModalEditar}
                                onEliminar={handleEliminar}
                            />

                          
                            <Paginacion links={productos.links} />
                        </div>
                    </div>
                </div>
            </div>

            {modalVisible && (
                <ProductoModal
                    form={form}
                    setForm={setForm}
                    productoEditar={productoEditar}
                    cerrarModal={cerrarModal}
                    guardarProducto={guardarProducto}
                />
            )}
        </AuthenticatedLayout>
    );
}

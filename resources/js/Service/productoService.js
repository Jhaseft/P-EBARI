import axios from 'axios';

export const getProductos = async (search = '', page = 1) => {
    try {
        const response = await axios.get('/api/productos', {
            params: { search, page },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return { data: [], meta: {} };
    }
};

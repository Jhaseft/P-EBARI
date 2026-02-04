<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // Listado con búsqueda y paginación
    public function index(Request $request)
    {
        $search = $request->input('search');

        $productos = Producto::query()
            ->when($search, function ($query, $search) {
                $query->where('producto', 'like', "%{$search}%")
                      ->orWhere('variante', 'like', "%{$search}%");
            })
            ->orderBy('id', 'asc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard', [
            'productos' => $productos,
            'filters' => $request->only('search'),
        ]);
    }

    // Guardar nuevo producto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'producto' => 'required|string|max:150',
            'variante' => 'nullable|string|max:150',
            'precio_min' => 'nullable|numeric',
            'precio_max' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|string',
        ]);

        $producto = Producto::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Producto creado correctamente',
            'producto' => $producto
        ]);
    }

    // Mostrar un producto (para editar en modal)
    public function show($id)
    {
        $producto = Producto::findOrFail($id);

        return response()->json($producto);
    }

    // Actualizar producto
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'producto' => 'required|string|max:150',
            'variante' => 'nullable|string|max:150',
            'precio_min' => 'nullable|numeric',
            'precio_max' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|string',
        ]);

        $producto = Producto::findOrFail($id);
        $producto->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Producto actualizado correctamente',
            'producto' => $producto
        ]);
    }

    // Eliminar producto
    public function destroy($id)
    {
        $producto = Producto::findOrFail($id);
        $producto->delete();

        return response()->json([
            'success' => true,
            'message' => 'Producto eliminado correctamente'
        ]);
    }
}
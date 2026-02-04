<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'productos';

    // Campos que se pueden llenar masivamente
    protected $fillable = [
        'producto',
        'variante',
        'precio_min',
        'precio_max',
        'stock',
        'descripcion',
        'imagen',
    ];

    // Tipo de llave primaria y autoincremento
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    // Timestamps (created_at y updated_at)
    public $timestamps = true;
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'status', 'user_id', 'last_updated_by'];

    // Relación con el usuario asignado a la tarea
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con el usuario que hizo la última actualización de la tarea
    public function lastUpdatedBy()
    {
        return $this->belongsTo(User::class, 'last_updated_by');
    }
}

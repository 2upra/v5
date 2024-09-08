<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{

    //Busca una tarea
    public function index(Request $request)
    {
        $description = $request->query('description'); 
        $tasks = Task::where('description', $description)->get();
        return response()->json($tasks);
    }

    //Guarda una tarea en la base de datos
    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string|max:255',
            'status' => 'required|in:default,in_progress,completed',
            'executed_by' => 'nullable|exists:users,id',
        ]);

        Task::create($request->all());
    }
    public function show(Task $task)
    {
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        // Verificar si el usuario está autenticado
        if (!auth()->check()) {
            return response()->json(['error' => 'No autenticado'], 403);
        }
    
        // Validar los datos recibidos
        $request->validate([
            'description' => 'required|string|max:255',
            'status' => 'required|in:default,in_progress,completed',
            'executed_by' => 'nullable|exists:users,id',
        ]);
    
        // Si la tarea está en progreso o completada, verificar que el usuario autenticado sea el mismo que la marcó
        if (in_array($task->status, ['in_progress', 'completed']) && $task->executed_by !== auth()->id()) {
            return response()->json(['error' => 'No autorizado para cambiar el estado de esta tarea'], 403);
        }
    
        // Si el estado es "default", no asignar la ID del usuario
        $executedBy = $request->input('status') === 'default' ? null : auth()->id();
    
        // Actualizar la tarea con los datos recibidos y la ID del usuario si no es "default"
        $task->update([
            'description' => $request->input('description'),
            'status' => $request->input('status'),
            'executed_by' => $executedBy,
        ]);
    
        return response()->json($task);
    }

    // Eliminar una tarea según la ID
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index');
    }
}

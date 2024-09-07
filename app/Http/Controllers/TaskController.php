<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        Log::debug('Fetching all tasks');

        // Obtener todas las tareas con el usuario asignado y el último que actualizó
        $tasks = Task::with(['user', 'lastUpdatedBy'])->get();
        Log::debug('Tasks fetched', ['tasks' => $tasks]);

        return Inertia::render('Welcome', [
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        Log::debug('Storing a new task', ['request_data' => $request->all()]);

        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|in:inactive,in_progress,completed',
                'user_id' => 'required|exists:users,id',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed', ['errors' => $e->errors()]);
            return response()->json(['errors' => $e->errors()], 422);
        }
    
        // Verificar si ya existe una tarea con el mismo título
        $existingTask = Task::where('title', $validated['title'])->first();
        if ($existingTask) {
            return response()->json([
                'message' => 'Una tarea con este título ya existe',
                'task' => $existingTask,
                'tasks' => Task::all(),
            ], 422);
        }
    
        $task = Task::create($validated);
        Log::info('Task created successfully', ['task' => $task]);
    
        return response()->json([
            'task' => $task,
            'tasks' => Task::all(),
        ]);
    }

    public function update(Request $request, Task $task)
    {
        Log::debug('Updating task', ['task_id' => $task->id, 'current_status' => $task->status, 'new_status' => $request->status]);
    
        $request->validate([
            'status' => 'required|in:inactive,in_progress,completed',
        ]);
    
        if ($task->status !== 'inactive' && $task->user_id !== auth()->id()) {
            Log::warning('Task update failed: task in progress or completed by another user', ['task_id' => $task->id]);
            return back()->with('error', 'Esta tarea está en progreso o completada por otro usuario.');
        }
    
        $task->update([
            'status' => $request->status,
            'user_id' => $request->status === 'inactive' ? null : auth()->id(),
            'last_updated_by' => auth()->id(),
        ]);
    
        Log::info('Task updated successfully', ['task' => $task]);
    
        return back();
    }
}

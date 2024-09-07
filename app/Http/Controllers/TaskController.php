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
                'id' => 'nullable|integer|exists:tasks,id',
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|in:inactive,in_progress,completed',
            ]);
        
            if (isset($validated['id'])) {
                $task = Task::findOrFail($validated['id']);
                $task->update($validated);
            } else {
                $task = Task::create($validated);
            }
            // Agregar el user_id del usuario autenticado
            $validated['user_id'] = auth()->id();
    
            // Verificar si ya existe una tarea con el mismo título
            $existingTask = Task::where('title', $validated['title'])->first();
            if ($existingTask) {
                return Inertia::render('Welcome', [
                    'message' => 'Una tarea con este título ya existe',
                    'task' => $existingTask,
                    'tasks' => Task::all(),
                ])->toResponse($request)->setStatusCode(422);
            }
    
            $task = Task::create($validated);
            Log::info('Task created successfully', ['task' => $task]);
    
            return Inertia::render('Welcome', [
                'task' => $task,
                'tasks' => Task::all(),
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating task', ['error' => $e->getMessage()]);
            return Inertia::render('Welcome', [
                'error' => 'Error al crear la tarea: ' . $e->getMessage(),
            ])->toResponse($request)->setStatusCode(500);
        }
    }

    public function update(Request $request, Task $task)
    {
        Log::debug('Updating task', ['task_id' => $task->id, 'current_status' => $task->status, 'new_status' => $request->status]);
    
        $request->validate([
            'status' => 'required|in:inactive,in_progress,completed',
        ]);
    
        // Permitir que el mismo usuario actualice la tarea
        if ($task->status !== 'inactive' && $task->user_id !== null && $task->user_id !== auth()->id()) {
            Log::warning('Task update failed: task in progress or completed by another user', ['task_id' => $task->id]);
            return Inertia::render('Welcome', [
                'error' => 'Esta tarea está en progreso o completada por otro usuario.',
            ])->toResponse($request)->setStatusCode(403);
        }
    
        $task->update([
            'status' => $request->status,
            'user_id' => $request->status === 'inactive' ? null : auth()->id(),
            'last_updated_by' => auth()->id(),
        ]);
    
        Log::info('Task updated successfully', ['task' => $task]);
    
        return Inertia::render('Welcome', [
            'task' => $task->fresh()->load(['user', 'lastUpdatedBy']),
        ]);
    }
}
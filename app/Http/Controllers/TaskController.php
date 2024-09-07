<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::with('user')->get();
        return Inertia::render('Tasks/Index', ['tasks' => $tasks]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Verifica si la tarea ya existe
        $task = Task::firstOrCreate(
            ['title' => $request->title],
            ['description' => $request->description]
        );

        return redirect()->back();
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'status' => 'required|in:inactive,in_progress,completed',
        ]);

        if ($task->status === 'in_progress' && $task->user_id !== auth()->id()) {
            return redirect()->back()->withErrors(['message' => 'Esta tarea está en progreso por otro usuario.']);
        }

        $task->update([
            'status' => $request->status,
            'user_id' => $request->status === 'inactive' ? null : auth()->id(),
        ]);

        return redirect()->back();
    }
}
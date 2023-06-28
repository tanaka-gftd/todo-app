<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TaskList;
use Illuminate\Http\Request;


class TaskListController extends Controller
{
    //タスクリストの名前登録
    public function register(Request $request): void
    {
        $request->validate([
            'taskListTitle' => 'required|string|max:255'
        ]);

        TaskList::create([
            'taskListTitle' => $request->title,
        ]);
    }
}

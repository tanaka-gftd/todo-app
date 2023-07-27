<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //タスクの登録
    public function register(Request $request): void
    {
        //入力された文字列のチェック
        $request->validate([
            'taskName' => 'required|string|max:255',
            'comment' => 'required|string|max:255'
        ]);

        //tasksテーブルに、レコード登録
        Task::create([
            'task_list_id' => $request->taskListId,
            'task' => $request->taskName,
            'comment' => $request->comment,
            'is_done' => $request->isDone,
            'deadline' => $request->deadline,

            //フロントから送られてくる$request->priorityは文字列型
            //DB登録時に自動で数値型に変換されるようだが、念の為intvalでキャストしておく
            'priority' => intval($request->priority), 
        ]);
    }
}
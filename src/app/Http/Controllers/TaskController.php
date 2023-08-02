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
            'deadline' => $request->deadline,

            //フロントから送られてきた真偽値は、DBでは'0'もしくは'1'に変換されて格納される
            //'0'がfalse、'1'がtrueを示す
            'is_done' => $request->isDone,
            
            //フロントから送られてくる$request->priorityは文字列型
            //DB登録時に自動で数値型に変換されるようだが、念の為intvalでキャストしておく
            'priority' => intval($request->priority), 
        ]);
    }


    //タスク完了
    public function done(Request $request): void
    {
        $taskId = $request->taskId;
        
        Task::where('id', $taskId)->update([
            'is_done' => 1  //is_doneカラムの値が1でタスク完了を示す(タスク未完了は0)
        ]);
    }


    //タスクを削除(論理削除)
    public function delete(Request $request): void
    {
        $taskId = $request->taskId;
        
        Task::find($taskId)->delete();
    }
}
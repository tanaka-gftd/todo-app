<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TaskList;
use Illuminate\Http\Request;
use Inertia\Inertia;


class TaskListController extends Controller
{
    //タスクリストの名前登録
    public function register(Request $request): void
    {
        //入力された文字列のチェック
        $request->validate([
            'newTaskListTitle' => 'required|string|max:255'
        ]);

        /*
        Illuminate\Support\Facades\Auth は、Laravel9以降から、auth()で代用できるようになりました。
        (例)
        use Illuminate\Support\Facades\Auth
        $user = Auth::user()->id;
        ↓
        auth()->user()->id;
        */

        //task_listテーブルに、レコード登録
        TaskList::create([
            'user_id' => auth()->user()->id,
            'task_list_title' => $request->newTaskListTitle,
        ]);
    }


    //Dashboardコンポーネントのレンダー時に、ユーザーIDを条件にDBから抽出したタスクリストを渡す
    public function view()
    {
        $id = auth()->user()->id;

        return Inertia::render('Dashboard', [
            'taskLists' => TaskList::where('user_id', $id)->get(),
            'tasks' => TaskList::Join('tasks','task_lists.id','=', 'tasks.task_list_id')
                        ->where('task_lists.user_id','=', $id)
                        ->select(
                            'task_lists.user_id',
                            'task_lists.id as task_list_id',
                            'task_lists.task_list_title',
                            'tasks.id as task_id',
                            'tasks.task_list_id',
                            'tasks.task as task_name',
                            'tasks.comment',
                            'tasks.deadline',
                            'tasks.priority',
                            'tasks.is_done'
                        )
                        ->oldest('tasks.id') //orderBy('id', 'asc')->get()と同一、つまり昇順
                        ->get()
        ]);
    }
}

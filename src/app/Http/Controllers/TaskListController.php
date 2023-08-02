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
                        ->oldest('tasks.id') //oldest...orderBy(カラム, 'asc')->get()と同一、つまり昇順。(降順ならlatest)
                        ->whereNull('tasks.deleted_at')//whereNull...指定したカラムが「NULLではない」レコードを抽出
                        ->get()
                        /*
                            結合するテーブルに論理削除機能が設定されていないテーブルが含まれていると、
                            データ抽出時に論理削除されたレコードも取得してしまう。
                            ↓
                            なので、whereNull('tasks.deleted_at')を挟むことで、
                            tasksテーブルのdeleted_atカラムがnullではないレコード(=論理削除されていないレコード)だけが抽出されるようにする。
                        */
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TaskList;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;


class TaskListController extends Controller
{
    //タスクリストの名前登録
    public function register(Request $request): void
    {
        //入力された文字列のチェック
        $request->validate([
            'newTaskListTitle' => 'required|string|max:16'
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
                        ->leftJoin('tags as tag1', 'tasks.tag_id_1', '=', 'tag1.id')  //別名を設定（理由は後述）
                        ->leftJoin('tags as tag2', 'tasks.tag_id_2', '=', 'tag2.id')  //別名を設定（理由は後述）
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
                            'tasks.is_done',
                            'tag1.tag as tag_1',  //別名で取得
                            'tag2.tag as tag_2',  //別名で取得
                        )
                        ->oldest('tasks.id') //oldest...orderBy(カラム, 'asc')->get()と同一、つまり昇順。(降順ならlatest)
                        ->whereNull('tasks.deleted_at')//whereNull...指定したカラムが「NULLではない」レコードを抽出
                        ->get(),
                        /* 
                            同一テーブルを複数回参照するような結合の場合、
                            主テーブルではない方のテーブルにas句で別名を設定する必要がある。
                            これを行わずに結合しようとすると、
                            「Syntax error or access violation: 1066 Not unique table/alias: 'テーブル名'」
                            というエラーになる。
                        */
                        /* 
                            innerJoin(内部結合)...主テーブル、結合したいテーブル、共にデータが揃っているものだけ結合
                            outerJoin(外部結合)
                                leftJoin(左外部結合)
                                    主テーブルのデータを、結合しなかったデータも含めて全て出力すること
                                    (わかりやすくいうと、主テーブルの主キーは全て取得される)
                                    よって、結合したいテーブルから取り出したデータにはnullが含まれることもある
                                rightJoin(右外部結合)
                                    結合したいテーブルのデータを、結合しなかったデータも含めて全て出力すること
                                    (わかりやすくいうと、結合したいテーブルの主キーは全て取得される)
                                    よって、主テーブルから取り出したデータにはnullが含まれることもある
                                    (主テーブルの主キーが全て取得できるとは限らない)
                        */
                        /*
                            結合するテーブルに論理削除機能が設定されていないテーブルが含まれていると、
                            データ抽出時に論理削除されたレコードも取得してしまう。
                            ↓
                            なので、whereNull('tasks.deleted_at')を挟むことで、
                            tasksテーブルのdeleted_atカラムがnullではないレコード(=論理削除されていないレコード)だけが抽出されるようにする。
                        */
                    
            //コンポーネントのレンダリング時にはタグも渡すようにする
            'tag' => Tag::where('user_id', $id)->get()
        ]);
    }
}

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
            'taskName' => 'required|string|max:16',
            'comment' => 'required|string|max:100',
            'tagsArray' => 'array',
            'tagsArray.*' => 'string|max:16'
        ]);

        //フロントから送られてきたタグを保管する変数を用意
        //tasksテーブルのtag_id_1カラムとtag_id_2カラムは、どちらもnullでもOKなので、値はnullで宣言
        $tag_1 = null;
        $tag_2 = null;

        //フロントから送られてきたタグを保存した配列を、一旦別の変数に保存
        //この配列は、空配列、要素数1、要素数2、の3パターンのうちのどれかとなる
        $tagsArray = $request->tagsArray;

        //フロントから送られてきたタグを、タグを保存している配列の要素数に応じて変数に保存(nullを上書きする)
        //下記のpriorityと同様の理由で、念の為intvalで数値型にキャスト
        //なお、$tag_1がnullで、$tag_2に数値が入るようなパターンは無しとする
        if(count($tagsArray) === 2){
            $tag_1 = intval($tagsArray[0]);
            $tag_2 = intval($tagsArray[1]);
        } 
        if(count($tagsArray) === 1){
            $tag_1 = intval($tagsArray[0]);
        }

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

            //タグを登録
            'tag_id_1' => $tag_1,
            'tag_id_2' => $tag_2
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
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller 
{
    //タグの登録
    public function register(Request $request): void
    {
        //入力された文字列のチェック
        $request->validate([
          'newTag' => 'required|string|max:16'
        ]);


        //tagテーブルに、レコード登録
        Tag::create([
          'user_id' => auth()->user()->id,
          'tag' => $request->newTag
      ]);
    }


    //タグを削除(論理削除)
    /* 
      ここで削除したタグは、
      ダッシュボード左側に表示されるタグ一覧と、タスク詳細設定ウィンドウに表示されなくなる。

      登録済みタスクからは、ここで削除したタグは削除しない方針。
    */
    public function delete(Request $request): void
    {
        $deleteTagId = $request->deleteTagId;
        Tag::find($deleteTagId)->delete();
    }
}
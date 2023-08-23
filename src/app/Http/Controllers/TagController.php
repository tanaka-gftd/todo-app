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
}
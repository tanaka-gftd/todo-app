<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //tasksテーブルに論理削除機能を追加
        Schema::table('tasks', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //ダウン時は、tasksテーブルから論理削除機能を削除
        Schema::table('tasks', function (Blueprint $table) {
            //Laravel5.8以降の書き方
            $table->dropSoftDeletes();

            /*
                Laravel5.7以前は、deleted_atカラムを削除することで行う
                $table->dropColumn('deleted_at'); 
            */
        });
    }
};

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
            $table->dateTime('deadline')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //ダウン時は、tasksテーブルに論理削除機能を削除
        Schema::table('tasks', function (Blueprint $table) {
            $table->date('deadline')->change();
        });
    }
};

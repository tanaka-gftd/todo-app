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
        //task_listsテーブルに論理削除機能を追加
        Schema::table('task_lists', function (Blueprint $table) {
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
        //ダウン時は、task_listsテーブルから論理削除機能を削除
        Schema::table('task_lists', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};

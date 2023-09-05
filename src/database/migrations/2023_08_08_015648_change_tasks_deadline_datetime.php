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
        //tasksテーブルのdeadlineカラムの日付形式を変更
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
        //up時に変更した設定を戻す
        Schema::table('tasks', function (Blueprint $table) {
            $table->date('deadline')->change();
        });
    }
};

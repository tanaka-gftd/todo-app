<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskListsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'title' => 'タイトル１'
        ];
        DB::table('task_lists')->insert($param);

        $param = [
            'title' => 'タイトル２'
        ];
        DB::table('task_lists')->insert($param);

        $param = [
            'title' => 'タイトル３'
        ];
        DB::table('task_lists')->insert($param);
    }
}

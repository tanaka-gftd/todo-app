<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'title' => 'タスクA',
            'comment' => 'タスクAのコメントです',
            'is_done' => true,
            'deadline' => '2020/08/20',
            'priority' => 0
        ];
        DB::table('tasks')->insert($param);

        $param = [
            'title' => 'タスクB',
            'comment' => 'タスクBのコメントです',
            'is_done' => false,
            'deadline' => '2020/09/21',
            'priority' => 5
        ];
        DB::table('tasks')->insert($param);

        $param = [
            'title' => 'タスクC',
            'comment' => 'タスクCのコメントです',
            'is_done' => true,
            'deadline' => '2020/11/22',
            'priority' => 2
        ];
        DB::table('tasks')->insert($param);

        $param = [
            'title' => 'タスクD',
            'comment' => 'タスクDのコメントです',
            'is_done' => false,
            'deadline' => '2020/12/22',
            'priority' => 3
        ];
        DB::table('tasks')->insert($param);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SubTasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'title' => 'サブタスクA',
            'comment' => 'サブタスクAのコメントです',
            'is_done' => false,
            'deadline' => '2020/10/11',
            'priority' => 2
        ];
        DB::table('sub_tasks')->insert($param);

        $param = [
            'title' => 'サブタスクB',
            'comment' => 'サブタスクBのコメントです',
            'is_done' => false,
            'deadline' => '2020/10/12',
            'priority' => 1
        ];
        DB::table('sub_tasks')->insert($param);

        $param = [
            'title' => 'サブタスクC',
            'comment' => 'サブタスクCのコメントです',
            'is_done' => true,
            'deadline' => '2020/10/13',
            'priority' => 1
        ];
        DB::table('sub_tasks')->insert($param);

        $param = [
            'title' => 'サブタスクD',
            'comment' => 'サブタスクDのコメントです',
            'is_done' => true,
            'deadline' => '2020/10/14',
            'priority' => 3
        ];
        DB::table('sub_tasks')->insert($param);
    }
}

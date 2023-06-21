<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'name' => 'タグA'
        ];
        DB::table('tags')->insert($param);

        $param = [
            'name' => 'タグB'
        ];
        DB::table('tags')->insert($param);

        $param = [
            'name' => 'タグC'
        ];
        DB::table('tags')->insert($param);
    }
}

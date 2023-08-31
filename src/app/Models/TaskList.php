<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskList extends Model
{
    use HasFactory;

    //論理削除を使用可能にする設定
    use SoftDeletes; 

    protected $table = 'task_lists';

    protected $fillable = [
        'user_id',
        'task_list_title'
    ];
}
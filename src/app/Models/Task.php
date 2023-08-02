<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory;

    //論理削除を使用可能にする設定
    use SoftDeletes;  

    protected $table = 'tasks';

    protected $fillable = [
        'task',
        'comment',
        'is_done',
        'deadline',
        'priority',
        'task_list_id',
        'tag_id_1',
        'tag_id_2'
    ];
}

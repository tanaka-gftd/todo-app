<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    protected $fillable = [
        'title',
        'comment',
        'is_done',
        'deadline',
        'priority',
        'task_list_id',
        'tag_id_1',
        'tag_id_2'
    ];
}

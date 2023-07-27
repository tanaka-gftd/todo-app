<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    use HasFactory;

    protected $table = 'task_lists';

    protected $fillable = [
        'user_id',
        'task_list_title'
    ];
}
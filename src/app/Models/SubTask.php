<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubTask extends Model
{
    use HasFactory;

    protected $table = 'sub_tasks';

    protected $fillable = [
        'title',
        'comment',
        'is_done',
        'deadline',
        'priority'
    ];
}

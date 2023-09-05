<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use HasFactory;

    //論理削除を使用可能にする設定
    use SoftDeletes;  

    protected $table = 'tags';

    protected $fillable = [
        'user_id',
        'tag'
    ];
}

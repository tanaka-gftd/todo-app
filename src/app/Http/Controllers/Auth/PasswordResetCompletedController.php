<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetCompletedController extends Controller
{
    //パスワードリセット完了画面を表示
    public function create(): Response
    {
        return Inertia::render('Auth/ResetPasswordCompleted', [
            /* パスワードリセット完了画面には、データを渡す必要はないはず */
        ]);
    }
}
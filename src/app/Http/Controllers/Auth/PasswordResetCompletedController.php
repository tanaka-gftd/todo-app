<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
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
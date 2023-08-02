<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskListController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//TaskListControllerのviewメソッドとURLを結びつける
/* 
    TaskListControllerのviewメソッドでは、
        •Dashboardコンポーネントのレンダリング
        •ユーザーIDを条件にDBから抽出したタスクリストをDashboardコンポーネントに渡す
    を行っている。
*/
Route::get(
    '/api/tasklist', [TaskListController::class, 'view']
)->middleware(['auth', 'verified'])->name('tasklist.view');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    //タスクリストの名前登録
    Route::post('/api/tasklist/create', [TaskListController::class, 'register'])->name('tasklist.register');

    //タスクの登録
    Route::post('/api/tasklist/{id}/create', [TaskController::class, 'register'])->name('task.register');

    //タスクの更新(タスクを完了にする)
    Route::put('/api/tasklist/{id}/done', [TaskController::class, 'done'])->name('task.done');

    //タスクの削除
    Route::post('/api/tasklist/{id}/delete', [TaskController::class, 'delete'])->name('task.delete');
});

require __DIR__.'/auth.php';
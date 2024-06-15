<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ToDoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return inertia('/home/index');
});
Route::controller(HomeController::class)->name('home.')
->group(function(){
    Route::get('/index','index')->name('index');
    Route::get('/about','about')->name('about');
});




// -------------------------------
Route::controller(ToDoController::class)->name('todo.')
->group(function(){
    Route::get('/to-do','index')->name('index');
    Route::post('/todo','store')->name('store');
    Route::put('/todo/{id}','update')->name('update');
    });
// -------------------------------











// __________________ ARTICLES ROUTES
Route::controller(ArticleController::class)->name('article.')
->group(function(){
    Route::get('/articles','index')->name('list');
    Route::post('/articles','create')->name('create');
    Route::put('/article/{id}','update')->name('update');
    Route::get('/article/{id}','show')->name('show');
});

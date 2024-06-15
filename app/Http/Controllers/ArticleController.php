<?php

namespace App\Http\Controllers;

use inertia;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //ind
    private $routeFolder = "Article";
    function index()  {
        return inertia($this->routeFolder."/Index");
    }

    function create() {
        return inertia($this->routeFolder."/form");
    }

    function update() {
        return inertia($this->routeFolder."/update");
    }

    function show()  {
        return inertia($this->routeFolder."/show");
    }
}

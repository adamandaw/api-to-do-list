<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index() {
        $data="Mohamed Adama Ndaw";
        return inertia("home/index",[
            "name" => $data
        ]);
    }
    function about() {
        return inertia("home/about");
    }
}

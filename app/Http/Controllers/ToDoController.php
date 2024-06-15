<?php

namespace App\Http\Controllers;

use App\Models\ToDo;
use App\Http\Requests\StoreToDoRequest;
use App\Http\Requests\UpdateToDoRequest;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\DB;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia("todo/Todo",[
            "title" => "TESTE"
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(HttpRequest $request)
    {
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreToDoRequest $request)
    {
        if ($request->rules()) {
            
            return redirect()->route('todo.index');
        }    

    }

    public function update(UpdateToDoRequest $request, ToDo $toDo)
    {
        
        ToDo::where('id', $toDo->getId())->update([
            'title'         => $request->title,
            'date'          => $request->date,
            'time'          => $request->time,
            'detail'        => $request->detail,
        ]);

        return response()->json('Update !');
    }

    /**
     * Display the specified resource.
     */
    public function show(ToDo $toDo)
    {
        $tache =  DB::table("articles")->find($toDo->getId());

        // ----------------------  -  A REVOIR 
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ToDo $toDo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ToDo $toDo)
    {
        //
    }
}

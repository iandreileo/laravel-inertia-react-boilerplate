<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use model widget
use App\Models\Widget;

class WidgetController extends Controller
{
    // Generate a javascript snippet for a widget
    public function generateScript(Request $request)
    {
        // Get widget from database without relationships
        $widget = Widget::where('id', $request->id)->first();

        // create a script that append a form into a specific div with tghe id "test"
        $script = "
            var div = document.getElementById('test');
            var form = document.createElement('form');
            form.setAttribute('method', 'post');
            form.setAttribute('action', 'http://localhost:8000/api/interactions');
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', 'widget_id');
            input.setAttribute('value', '".$widget->id."');
            form.appendChild(input);
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', 'type');
            input.setAttribute('value', 'click');
            form.appendChild(input);
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', 'device');
            input.setAttribute('value', 'desktop');
            form.appendChild(input);
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', 'device_type');
            input.setAttribute('value', 'desktop');
            form.appendChild(input);
            var input = document.createElement('input');
            input.setAttribute('type', 'submit');
            input.setAttribute('value', 'Submit');
            form.appendChild(input);
            div.appendChild(form);
        ";
        

        


        return response($script)->header('Content-Type', 'application/javascript');
    }
}

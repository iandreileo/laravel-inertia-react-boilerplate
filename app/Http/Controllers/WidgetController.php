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

        // create a script that add a form with 1 field to the page and submit it through ajax on button click
        $script = "
                // Create a form
                var form = document.createElement('form');
                form.setAttribute('method', 'post');
                form.setAttribute('action', '/interactions');
                form.setAttribute('id', 'interaction-form');

                // Create an input
                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'widget_id');
                input.setAttribute('value', '".$widget->id."');

                // Append the input to the form
                form.appendChild(input);

                // Append the form to the body
                document.getElementsByTagName('body')[0].appendChild(form);

                // Create a button
                var button = document.createElement('button');
                button.setAttribute('type', 'button');
                button.setAttribute('form', 'interaction-form');
                button.setAttribute('id', 'interaction-button');
                button.innerHTML = 'Submit';

                // Append the button to the body
                document.getElementsByTagName('body')[0].appendChild(button);


                // Create a function to submit the form ajax
                function submitFormAjax() {
                    // Get the form
                    var form = document.getElementById('interaction-form');

                    // Get the button
                    var button = document.getElementById('interaction-button');

                    // Disable the button
                    button.disabled = true;

                    // Create a new XMLHttpRequest object
                    var xhr = new XMLHttpRequest();

                    // Open the request
                    xhr.open(form.method, form.action, true);

                    // Set up a handler for when the request finishes
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            // Re enable the button
                            button.disabled = false;
                        } else {
                            // Re enable the button
                            button.disabled = false;
                        }
                    };

                    // Send the data
                    xhr.send(new FormData(form));
                }

                // Add an event listener to the button
                document.getElementById('interaction-button').addEventListener('click', function() {
                    submitFormAjax();
                });
        ";
        


        return response($script)->header('Content-Type', 'application/javascript');
    }
}

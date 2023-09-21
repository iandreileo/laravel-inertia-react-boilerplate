<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;


class FileController extends Controller
{

    // Create new file in the database
    public function create(Request $request)
    {
        // Validate the request
        $request->validate([
            // file pdf
            'file' => 'required|mimes:jpeg,png,jpg,gif,svg,pdf|max:10000',
        ]);

        // Get the user
        $user = $request->user();

        // Create the file
        $file = $user->files()->create([
            'name' => $request->file->getClientOriginalName(),
            'type' => 'text',
            'file_path' => 'asd 1',
            'file_name' => 'asd 2',
            'text_file_path' => 'asd 3',
            'file_size' => $request->file->getSize()
        ]);

        // If error
        if (!$file) {
            // redirect back
            return back()->with('error', 'Something went wrong. Please try again.');
        }
        
                
        // redirect back
        return back()->with('success', 'File uploaded successfully.');

    }


}

<?php

use App\Http\Controllers\ProfileController;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\FileController;
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
})->name('home');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', function() {
        // get all files from current user
        $files = auth()->user()->files;
        return Inertia::render('Dashboard',
        [
            'files' => $files
        ]);
    })->name('dashboard');

    Route::get('/settings', function() {
        return Inertia::render('Dashboard/Settings', [
            'plans' => config('stripe.plans'),
            'subscriptions' => auth()->user()->subscriptions
        ]);
    })->name('settings');

    Route::get('/billing-portal', function (Request $request) {
        return $request->user()->redirectToBillingPortal();
    })->name('billing-portal');

    Route::get('/subscription-checkout', function (Request $request) {
        // Get the id from the request
        $plan = $request->get('plan');

        // Get the plan from the config
        $plan_object = config('stripe.plans')[$plan];

        if(!$plan) {
            return redirect()->route('dashboard');
        }

        return $request->user()
            ->newSubscription($plan, $plan_object->id)
            ->checkout();
    })->name('subscription-checkout');

    // Create new file
    Route::post('/files', [FileController::class, 'create'])->name('files.create');

    // chat/id
    Route::get('/documents/{id}', function($id) {

        // Get the file with the id from the current user
        $file = auth()->user()->files()->where('id', $id)->first();

        // If no file
        if(!$file) {
            // redirect inertia to dashboard
            return redirect()->route('dashboard');
        }

        return Inertia::render('Chat', [
            'file' => $file
        ]);
    })->name('documents.show');



   

});

require __DIR__ . '/auth.php';
<?php

use App\Http\Controllers\ProfileController;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\FileController;
use App\Http\Controllers\WidgetController;
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
    // Redirect to login
    return redirect()->route('login');
})->name('home');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/editor', function() {
        return Inertia::render('Editor/Index');
    })->name('dashboard.editor.index');

    Route::get('/render', function() {
        return Inertia::render('Editor/Render', [
            'content' => '{"ROOT":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"padding":5,"background":"#eeeeee","data-cy":"root-container"},"displayName":"Container","custom":{},"hidden":false,"nodes":["TjMt1hKFla","K7apUSpvUk","x53LY6acdt","QTXfMXNQ4t"],"linkedNodes":{}},"TjMt1hKFla":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Hello World"},"displayName":"Text","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"x53LY6acdt":{"type":{"resolvedName":"Form"},"isCanvas":true,"props":{"padding":20},"displayName":"Form","custom":{},"parent":"ROOT","hidden":false,"nodes":["MVD789PZF6","FddcSFqd9M"],"linkedNodes":{}},"QTXfMXNQ4t":{"type":{"resolvedName":"Form"},"isCanvas":true,"props":{"padding":20},"displayName":"Form","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"FddcSFqd9M":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"padding":20},"displayName":"Container","custom":{},"parent":"x53LY6acdt","hidden":false,"nodes":[],"linkedNodes":{}},"MVD789PZF6":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"padding":20},"displayName":"Container","custom":{},"parent":"x53LY6acdt","hidden":false,"nodes":[],"linkedNodes":{}},"K7apUSpvUk":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"padding":20},"displayName":"Container","custom":{},"parent":"ROOT","hidden":false,"nodes":["SQBuN6tMyl"],"linkedNodes":{}},"SQBuN6tMyl":{"type":{"resolvedName":"Form"},"isCanvas":true,"props":{"padding":20},"displayName":"Form","custom":{},"parent":"K7apUSpvUk","hidden":false,"nodes":[],"linkedNodes":{}}}'
        ]);
    })->name('dashboard.editor.render');

    Route::get('/dashboard', function() {
        // redirect to widgets
        return redirect()->route('dashboard.widgets.index');
    })->name('dashboard');

    Route::get('/websites', function() {
        return Inertia::render('Dashboard/Websites');
    })->name('dashboard.websites.index');

    Route::get('/widgets', function() {

        // Get widgets from database
        $widgets = auth()->user()->getWidgetsAttribute();

        return Inertia::render('Dashboard/Widgets/Index', [
            'widgets' => $widgets
        ]);
    })->name('dashboard.widgets.index');

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

});

// POC
Route::get('/widget-script/{id}', [WidgetController::class, 'generateScript'])->name('widget.script');

require __DIR__ . '/auth.php';
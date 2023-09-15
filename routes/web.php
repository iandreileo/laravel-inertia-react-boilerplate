<?php

use App\Http\Controllers\ProfileController;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
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
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/settings', function() {
        return Inertia::render('Dashboard/Settings');
    })->name('settings');

    Route::get('/billing-portal', function (Request $request) {
        return $request->user()->redirectToBillingPortal();
    })->name('billing-portal');

    Route::get('/subscription-checkout', function (Request $request) {
        return $request->user()
            ->newSubscription('default', 'price_1NqcVaCOYw0FFWf28Ebr8lgG')
            ->checkout([
                'success_url' => route('subscription-success').'?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('subscription-cancel'),
            ]);
    });

    Route::get('/checkout-cancel', function () {
        return redirect()->route('dashboard');
    })->name('subscription-cancel');

    Route::get('/checkout-success', function (Request $request) {
        $checkoutSession = $request->user()->stripe()->checkout->sessions->retrieve($request->get('session_id'));
        
        if($checkoutSession->payment_status === 'paid') {
            // TODO: Create subscription

        }
     
        return redirect()->route('dashboard');
    })->name('subscription-success');

});


// Route::group(['middleware' => ['role:admin']], function () {
//     Route::group([
//         'prefix' => 'admin'
//     ],function () {

// });

require __DIR__ . '/auth.php';
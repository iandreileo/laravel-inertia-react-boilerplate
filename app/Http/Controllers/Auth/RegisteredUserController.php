<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Organization;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Asign role to user
        $user->assignRole('user');

        // Create Stripe customer
        // $user->createAsStripeCustomer();

        // Create a default organization
        $organization = Organization::create([
            'name' => $request->name,
            'owner_id' => $user->id,
        ]);

        // Create a default site
        $organization->sites()->create([
            'name' => $request->name,
            'owner_id' => $user->id,
            'domains' => json_encode([
                'localhost',
            ]),
        ]);

        // Set current organization and site
        $user->current_organization_id = $organization->id;
        $user->current_site_id = $organization->sites()->first()->id;
        $user->save();


        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}

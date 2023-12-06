<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'menu' => function () use ($request) {
                $menu = [];
                if ($request->user()) {
                    $roles = $request->user()->getRoleNames();
                    foreach ($roles as $role) {
                        $menu = array_merge($menu, config('menu.' . $role));
                    }
                }
                return $menu;
            },
            'permissions' => function () use ($request) {
                if($request->user()) {
                    return $request->user()->getPermissionNames();
                }
            },
            'roles' => function () use ($request) {
                if($request->user()) {
                    return $request->user()->getRoleNames();
                }
            },
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                
            ],

        ]);
    }
}

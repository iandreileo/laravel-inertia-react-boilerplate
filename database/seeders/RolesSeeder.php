<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesSeeder extends Seeder
{
    /**
     * Create the initial roles and permissions.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Doc: Create roles
        $role1 = Role::create(['name' => 'owner']);
        $role2 = Role::create(['name' => 'admin']);
        $role3 = Role::create(['name' => 'user']);

        // Doc: Create default users and assign roles
        $user = \App\Models\User::factory()->create([
            'name' => 'Super-Admin',
            'email' => 'office@inntech.dev',
            'password' => 'admin'
        ]);
        $user->assignRole($role1);

        $user = \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.ro',
            'password' => 'admin'
        ]);
        $user->assignRole($role2);

        $user = \App\Models\User::factory()->create([
            'name' => 'Employee',
            'email' => 'employee@employee.ro',
            'password' => 'employee'
        ]);
        $user->assignRole($role3);

    }
}


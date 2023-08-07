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



        // create roles and assign existing permissions
        $role1 = Role::create(['name' => 'Super-Admin']);

        $role2 = Role::create(['name' => 'admin']);

        $role3 = Role::create(['name' => 'user']);

        // Create an super-admin user
        $user = \App\Models\User::factory()->create([
            'name' => 'Super-Admin',
            'email' => 'office@inntech.dev',
            'password' => 'admin'
        ]);
        $user->assignRole($role1);

        // Create an admin user
        $user = \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.ro',
            'password' => 'admin'
        ]);

        $user->assignRole($role2);

        // Create an employee user
        $user = \App\Models\User::factory()->create([
            'name' => 'Employee',
            'email' => 'employee@employee.ro',
            'password' => 'employee'
        ]);

        $user->assignRole($role3);

    }
}


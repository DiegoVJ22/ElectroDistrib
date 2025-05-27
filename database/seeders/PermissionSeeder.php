<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roleAdmin = Role::create(['name' => 'Administrador']);
        $roleProveedor = Role::create(['name' => 'Proveedor']);

        // Usuarios
        Permission::create(['name' => 'Ver Usuarios'])->syncRoles([$roleAdmin]);
        Permission::create(['name' => 'Crear Usuarios'])->syncRoles([$roleAdmin]);
        Permission::create(['name' => 'Editar Usuarios'])->syncRoles([$roleAdmin]);
        Permission::create(['name' => 'Eliminar Usuarios'])->syncRoles([$roleAdmin]);

        // Roles
        Permission::create(['name' => 'Ver Roles'])->syncRoles([$roleAdmin]);
        Permission::create(['name' => 'Crear Roles'])->syncRoles([$roleAdmin]);
        Permission::create(['name' => 'Editar Roles'])->syncRoles([$roleAdmin]);
        Permission::create(['name' => 'Eliminar Roles'])->syncRoles([$roleAdmin]);

        // Productos
        Permission::create(['name' => 'Ver Productos'])->syncRoles([$roleAdmin, $roleProveedor]);
        Permission::create(['name' => 'Crear Productos'])->syncRoles([$roleAdmin, $roleProveedor]);
        Permission::create(['name' => 'Editar Productos'])->syncRoles([$roleAdmin, $roleProveedor]);
        Permission::create(['name' => 'Eliminar Productos'])->syncRoles([$roleAdmin, $roleProveedor]);
    }
}

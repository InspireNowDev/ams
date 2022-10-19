<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class PermissionController extends Controller
{
    public function index()
    {
        $role = Role::with('permissions')->get();
        //$permission = Permission::with('roles')->get();
        $permission = DB::table('role_permission')->get();

        return response()->json([
            'status' => true,
            'role' => $role,
            'feature' => $permission
        ]);
    }
}

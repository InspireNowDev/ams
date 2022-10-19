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
        $feature = DB::table('role_permission')->get();
        $permission = Permission::all();

        return response()->json([
            'status' => true,
            'role' => $role,
            'feature' => $feature,
            'permission' => $permission
        ]);
    }
}

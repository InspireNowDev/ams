<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Permission;
use App\Models\Role;

class PermissionController extends Controller
{
    public function index()
    {
        $role = Role::with('permissions')->get();

        return response()->json([
            'status' => true,
            'role' => $role
        ]);
    }
}

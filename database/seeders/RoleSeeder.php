<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Str;
use Carbon\Carbon;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = [
            [
               'id'=> 1,
               'role_title'=>'super-admin',
               'role_desc'=>'Super Admin',
               'created_at'=>Carbon::now(),
               'updated_at'=>Carbon::now(),
            ],
            [
                'id'=> 2,
               'role_title'=>'admin',
               'role_desc'=>'Admin',
               'created_at'=>Carbon::now(),
               'updated_at'=>Carbon::now(),
            ],
            [
                'id'=> 3,
                'role_title'=>'user',
                'role_desc'=>'User',
                'created_at'=>Carbon::now(),
               'updated_at'=>Carbon::now(),
            ],
        ];

        foreach ($role as $key => $value) 
        {
            DB::table('roles')->insert($value);
        }
    }
}

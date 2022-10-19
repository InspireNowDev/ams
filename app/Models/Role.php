<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'role_title',
        'role_desc',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'roles', 'id');
    }

    public function permissions(){
        return $this->belongsToMany(Permission::class, 'role_permission', 'role_id', 'permission_id')->withPivot('role_id', 'permission_id', 'status');
    }
}

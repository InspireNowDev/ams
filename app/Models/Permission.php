<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        'permission_title',
        'permission_desc',
        'status',
    ];

    public function roles(){
        return $this->belongsToMany(Role::class, 'role_permission', 'permission_id', 'role_id')->withPivot('role_id', 'permission_id', 'status');
    }
}

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
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Widget extends Model
{
    use HasFactory;

    protected $fillable = ['organization_id', 'owner_id', 'site_id', 'type', 'name', 'status', 'settings', 'scope'];

    protected $casts = [
        'settings' => 'array',
    ];
}

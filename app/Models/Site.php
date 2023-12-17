<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'owner_id', 'organization_id', 'domains'];

    protected $casts = [
        'domains' => 'array',
    ];
}
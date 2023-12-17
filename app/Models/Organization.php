<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'owner_id'];

    // users
    public function users()
    {
        return $this->hasMany(User::class);
    }

    // sites
    public function sites()
    {
        return $this->hasMany(Site::class);
    }

}

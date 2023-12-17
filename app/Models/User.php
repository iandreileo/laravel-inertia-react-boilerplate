<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Cashier\Billable;



class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Billable;
    use \Spatie\Permission\Traits\HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'current_organization_id', 'current_site_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // websites
    public function sites()
    {
        return $this->hasMany(Site::class, 'owner_id');
    }

    // organizations
    public function organizations()
    {
        return $this->hasMany(Organization::class, 'owner_id');
    }

    // widgets
    public function widgets()
    {
        return $this->hasMany(Widget::class, 'owner_id');
    }


    public function currentOrganization()
    {
        return $this->belongsTo(Organization::class, 'current_organization_id');
    }

    public function currentSite()
    {
        return $this->belongsTo(Site::class, 'current_site_id');
    }

    // Get the user's widgets with current organization and site
    public function getWidgetsAttribute()
    {
        return $this->widgets()->where('organization_id', $this->current_organization_id)->where('site_id', $this->current_site_id)->get();
    }



}

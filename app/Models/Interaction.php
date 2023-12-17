<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Interaction extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'device', 'device_type', 'widget_id', 'date'];
}

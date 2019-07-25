<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GeoInfo extends Model
{
    protected $table = 'geo_info';

    protected $fillable = [
        'request', 'response'
    ];
}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// ADDRESS
Route::get('/address/tips', 'Api\AddressController@tips');

// AUTH
Route::post('/auth/register', 'Api\AuthController@register');
Route::post('/auth/login', 'Api\AuthController@login');
Route::post('/auth/logout', 'Api\AuthController@logout');

// GEOINFO
Route::apiResource('geo-info', 'Api\GeoInfoController')->middleware('auth:api');



<?php

namespace App\Http\Controllers\Api;

use App\GeoInfo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GeoInfoController extends Controller
{
    public function index() {
        return GeoInfo::all();
    }

    public function show($id)
    {
        return GeoInfo::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $company = GeoInfo::findOrFail($id);
        $company->update($request->all());

        return $company;
    }

    public function store(Request $request)
    {
        $company = GeoInfo::create($request->all());
        return $company;
    }

    public function destroy($id)
    {
        $company = GeoInfo::findOrFail($id);
        $company->delete();
        return '';
    }
}

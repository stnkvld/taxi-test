<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\GeoInfo;

class AddressController extends Controller
{
    public function tips(Request $request) {
        $apiKey = env('YANDEX_GEO_KEY');
        $geocode = $request->text;

        $yandexRequest = "https://geocode-maps.yandex.ru/1.x/?apikey=$apiKey&format=json&geocode=$geocode";
        $yandexResponse = file_get_contents($yandexRequest);

        $geoInfo = new GeoInfo();
        $geoInfo->request = $yandexRequest;
        $geoInfo->response = $yandexResponse;
        $geoInfo->save();

        $yandexResponse = json_decode($yandexResponse, true);
        $yandexGeoObjects = $yandexResponse['response']['GeoObjectCollection']['featureMember'];

        array_splice($yandexGeoObjects, 6);

        $result = array_map(function($key, $item) {
            return [
                'id' => $key,
                'name' => $item['GeoObject']['metaDataProperty']['GeocoderMetaData']['Address']['formatted']
            ];
        }, array_keys($yandexGeoObjects), $yandexGeoObjects);

        return $result;
    }
}

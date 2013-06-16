<?php
if(isset($_GET["station_number"])){

    $station_number = $_GET["station_number"];
    $url = 'https://abo-paris.cyclocity.fr/service/stationdetails/' . $station_number;

    $informations = simplexml_load_file($url);

    $infoVelib = array(
        "available" => (string)$informations->available,
        "free" => (string)$informations->free,
        "total" => (string)$informations->total
    );

    print_r(json_encode($infoVelib));

}
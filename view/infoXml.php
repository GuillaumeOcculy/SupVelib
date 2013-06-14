<?php
    if(isset($_GET["station_number"])){

        $station_number = $_GET["station_number"];
        $url = 'https://abo-paris.cyclocity.fr/service/stationdetails/' . $station_number;

        $data = simplexml_load_file($url);

        $xmlArray = array(
            "available" => (string)$data->available,
            "free" => (string)$data->free,
            "total" => (string)$data->total
        );

        print_r(json_encode($xmlArray));

    }
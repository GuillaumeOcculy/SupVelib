<?php
    if(!isset($_GET['url']))
    {
       $url='';
    }
    else
    {
        $url = $_GET['url'];
    }
    if (!empty($url)) {
    $inter = file_get_contents($url);

    echo($inter);
}
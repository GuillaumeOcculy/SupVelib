<?php

require_once("../controllers/PDOFavorisManager.php");
require_once("../model/User.class.php");

session_start();

if(!isset($_SESSION["user"])){
    header("location: ../view/login.php");
}
else{

    $address = $_GET["address"];
    $user_id = $_SESSION["user"]->getId();
    $name = $_GET["name"];

    $favorisManager = new PDOFavorisManager();

    $favorisManager->createFavoris($name,$user_id,$address);

    header("location: ../view/dashboard.php");
}
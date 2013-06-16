<?php
/**
 * Created by JetBrains PhpStorm.
 * User: occul_000
 * Date: 16/06/13
 * Time: 19:15
 * To change this template use File | Settings | File Templates.
 */


require_once("../controllers/PDOFavorisManager.php");
require_once("../model/User.class.php");

session_start();

if(!isset($_SESSION["user"])){
    header("location: ../view/login.php");
}
else{
    $name = $_GET["name"];
    $address = $_GET["address"];
    $user_id = $_SESSION["user"]->getId();

    $favoriteManager = new PDOFavorisManager();

    $favoriteManager->addFavorite($name,$user_id,$address);

    header("location: ../view/dashboard.php");
}
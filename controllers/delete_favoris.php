<?php


require_once("../controllers/PDOFavorisManager.php");
require_once("../controllers/PDOUserManager.class.php");


if(isset($_GET["id"])&&isset($_SESSION["user"])){
    $favorisId = $_GET["id"];
    $favorisManager = new PDOFavorisManager();

    $favorisManager->deleteFavoris($favorisId);
    header("location: ../view/dashboard.php");
}
else{
    header("location: ../view/login.php");
}
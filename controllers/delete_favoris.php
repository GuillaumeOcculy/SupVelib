<?php
/**
 * Created by JetBrains PhpStorm.
 * User: occul_000
 * Date: 16/06/13
 * Time: 19:55
 * To change this template use File | Settings | File Templates.
 */

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
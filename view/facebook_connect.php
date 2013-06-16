<?php


require_once("../controllers/PDOUserManager.class.php");

$userManager = new PDOUserManager();
$user = $userManager->fbConnect();

$_SESSION["user"] = $user;
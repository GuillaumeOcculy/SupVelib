<?php

require_once("PDOUrlManager.class.php");
require_once("../model/User.class.php");
session_start();
if(isset($_SESSION['user'])){

        $user = $_SESSION['user'];
       // print_r($user);


    }else{
        header("Location:../view/");
    }
  if(isset($_GET["id"])){
        $urlId = $_GET["id"];
        $urlManager = new PDOUrlManager();

        $urlManager->deleteUrl($urlId,$user->getId());
        header("location: ../view/dashboard.php");
    }
    else{
        header("location: ../view/dashboard.php");
    }

?>
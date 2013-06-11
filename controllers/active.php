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
  if(isset($_GET["id"]) && isset($_GET["active"])){
        $urlId = $_GET["id"];
        $active = $_GET["active"];
        $urlManager = new PDOUrlManager();

        $urlManager->changeActive($active,$urlId);
        header("location: ../view/dashboard.php");
    }
    else{
        header("location: ../view/dashboard.php");
    }

?>
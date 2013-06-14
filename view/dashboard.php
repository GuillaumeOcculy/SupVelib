<?php
//define("PATH", "/Users/Chedly/Sites/suplink/");
require_once("../model/User.class.php");
require_once("../controllers/PDOUrlManager.class.php");

session_start();
if(isset($_SESSION['user'])){

    $user = $_SESSION['user'];



}else{
    header("Location:/suplink/view/");
}
$urlManager = new PDOUrlManager();
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="/suplink/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/suplink/css/miniproject.css" />
    <!-- Elément Google Maps indiquant que la carte doit être affiché en plein écran et
    qu'elle ne peut pas être redimensionnée par l'utilisateur -->
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <title>Dashboard</title>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

</head>


<body onload="showMap()">
<div class="navbar navbar-static-top">
    <div class="navbar-inner">
        <a class="brand" href="dashboard.php"> SupVelib</a>
        <ul class="nav pull-left">
            <li class="divider-vertical"></li>
            <li><a href="dashboard.php"> <i class="icon-home icon-white"> </i> <?php echo $user->getEmail(); ?></a></li>
        </ul>

        <ul class="nav pull-right">

            <li><a href="logout.php">Deconnexion</a></li>
            <li class="divider-vertical"></li>
            <li><a href="about.php">A propos</a></li>
        </ul>
    </div>
</div>
<div class="container">


    <div id="carte" style="width:800px; height:500px"></div>


</div>



<!-- (TIP) Google returns the latest version of jquery in the 1 series (from 1.0 to 1.9.9) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script type="text/javascript" src="../js/miniproject.js"></script>
<script type="text/javascript" src="../js/mapVelib.js"></script>
</body>

</html>
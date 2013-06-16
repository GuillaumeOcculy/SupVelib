<?php
session_start();

?>
<!DOCTYPE HTML>
<html style="height: 100%;">
<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/miniproject.css" />

    <title>About Suplink</title>
</head>


<body style="height: 100%;">
<div class="navbar navbar-static-top">
    <div class="navbar-inner">
        <a class="brand" href="register.php">SupLink</a>
        <ul class="nav pull-right">
            <li><a href="login.php">Login</a></li>
            <li class="divider-vertical"></li>
            <li><a href="register.php">Register</a></li>
            <li class="divider-vertical"></li>
            <li class="active"><a href="about.php">About</a></li>
        </ul>
    </div>
</div>
<div id="wrap">
    <div class="container">
        <div class="jumbotron">
            <h1 style="font-size: 100px;line-height: 1;">SupVelib</h1>
            <p class="lead" style="font-size: 24px; line-height: 1.25;">Vous aide à trouver la station de Velib la plus proche. Tout simplement.</p>
            <a class="btn btn-large btn-success" href="register.php">Sign up today</a>
        </div>
        <hr>

    </div>
    <div id="push"></div>
</div>
<div id="footer">
    <div class="container">
        <p class=" muted"> SupVelib 2013 - SUPINFO International university</p>
    </div>
</div>
<!-- (TIP) Google returns the latest version of jquery in the 1 series (from 1.0 to 1.9.9) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
</body>

</html>
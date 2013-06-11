<?php
    session_start();
    if(isset($_SESSION['user'])){
        header('Location: dashboard.php');
    }
?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="../css/miniproject.css" />
		
		<title>SupVelib</title>
	</head>


	<body>
		<div class="navbar navbar-static-top">
          <div class="navbar-inner">
            <a class="brand" href="register.php">SupVelib</a>
            <ul class="nav pull-right">             
              <li><a href="login.php">Connexion</a></li>
              <li class="divider-vertical"></li>            
              <li><a href="register.php">Inscription</a></li>
              <li class="divider-vertical"></li>
              <li><a href="about.php">A propos</a></li>
            </ul>
          </div>
    </div>
	<div class="container">
        <div class="jumbotron">
            <h1 style="font-size: 100px;line-height: 1;">SupVelib</h1>
            <p class="lead" style="font-size: 24px; line-height: 1.25;">Trouver un Velib' en un click</p>
            <a class="btn btn-large btn-success" href="register.php">Inscription </a>
        </div>
      <hr>
		</div>
<!-- (TIP) Google returns the latest version of jquery in the 1 series (from 1.0 to 1.9.9) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	</body>

</html>
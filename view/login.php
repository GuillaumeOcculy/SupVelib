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
			
	<div id="containerForm">
			<form method="post" name="signin" id="signin" action="../controllers/login_check.php">
				<input type="text" class="mail" name="email" placeholder="E-mail" required/>	<br /><br />
				<input type="password"  class="password" name="password" placeholder="Mot de passe" required/>  <br /><br />
				<input type="submit" class="btn btn-large btn-primary" name="login" value="Se connecter" />
			</form>			
		</div>	


   <a href="facebook_connect.php">  <img src="../img/facebook-connect-logo.jpg">  </a>

<!-- (TIP) Google returns the latest version of jquery in the 1 series (from 1.0 to 1.9.9) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script> 
		


</body>
</html>
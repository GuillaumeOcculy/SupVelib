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
 <div class="alert alert-info fade in" style="display : none">
            <h4> ERROR:</h4> Username is taken
        </div>
</div>

<div id="containerForm">
    <form method="post" name="signup" id="signup" action="../controllers/register_check.php">
        <input type="email" id="mail" name="email"  placeholder="E-mail"  required />
        <img  id="loader" style="display: none; width: 14px; height: 14px;" src="../img/ajax-loader.gif" alt="Loader">

       	<br /><br />
        
        <input type="password"  class="password" name="password" placeholder="Mot de passe" required /> <br /><br />
        <input type="password"  class="password" name="confirm" placeholder="Confirmation" required/> <br /><br />
        <input type="submit" class="btn btn-large btn-success" name="inscription" value="S'enregistrer" />
        <img  id="loaderform" style="display: none" src="../img/ajax-loader.gif" alt="Loader">
    </form>
</div>




<!-- (TIP) Google returns the latest version of jquery in the 1 series (from 1.0 to 1.9.9) -->

<script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="../js/bootstrap.min.js" ></script>

<script type="text/javascript" src="../js/miniproject.js"></script>

</body>
</html>
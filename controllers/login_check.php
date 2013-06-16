<?php

require_once ("PDOUserManager.class.php");



if(isset($_POST["email"]) && isset($_POST["password"]) ){
    $email = $_POST['email'];
    $password= $_POST['password'];

    $userManager = new PDOUserManager();
    $user=$userManager->authenticate($email,sha1($password));
    $_SESSION['user']= $user;
    header('Location:../view/dashboard.php');

}
?>
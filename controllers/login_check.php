<?php

require_once ("PDOUserManager.class.php");


/**
 * Created by JetBrains PhpStorm.
 * User: Chedly
 * Date: 26/02/13
 * Time: 18:34
 * To change this template use File | Settings | File Templates.
 */

if(isset($_POST["email"]) && isset($_POST["password"]) ){
    $email = $_POST['email'];
    $password= $_POST['password'];

    $userManager = new PDOUserManager();
    $user=$userManager->authenticate($email,sha1($password));
    $_SESSION['user']= $user;
    header('Location:../view/dashboard.php');

}
?>
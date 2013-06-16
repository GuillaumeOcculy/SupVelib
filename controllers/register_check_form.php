<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Chedly
 * Date: 03/03/13
 * Time: 20:17
 * To change this template use File | Settings | File Templates.
 */
require_once ("../core/PDOManager.class.php");
require_once ("PDOUserManager.class.php");

    extract($_POST);
    if(($password)!= $confirm){
        echo "ERROR : passwords must be identitical";
        return false;
    }elseif(filter_var($email,FILTER_VALIDATE_EMAIL) === false){
        echo " Email is not valid  <button type=\"button\" class=\"close\" informations-dismiss=\"alert\">&times;</button>";
        return false;
    }else{
        try {
            $PDOmanager = new PDOManager();
            $pdo = $PDOmanager->instantiatePDO();

            $sql = $pdo->query("SELECT * FROM users WHERE email = '$email' ");
            $sql = $sql->fetch(PDO::FETCH_ASSOC);

            if($sql){
                echo "Email is taken";
                return false;
            }
        }catch  (PDOException $e) {
            echo "error register";
        }
    }


$userManager = new PDOUserManager();
$userManager->register($email,$password,$confirm);

echo "Registration successful";
//header('Location:../view/login.php');


?>
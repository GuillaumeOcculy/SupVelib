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

/**
 * Created by JetBrains PhpStorm.
 * User: Chedly
 * Date: 27/02/13
 * Time: 20:44
 * To change this template use File | Settings | File Templates.
 */
extract($_POST);

if(isset($name)&& isset($url)){

    if(filter_var($url,FILTER_VALIDATE_URL) === false){
        echo " URL is not valid  <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>";
        return false;
    }else{

		$urlManager = new PDOUrlManager();
		$urlManager->addUrl($name,$url,$user->getId());
        echo " URL has been added successfully (Refresh in 2 seconds) ";
    }


}

  





?>
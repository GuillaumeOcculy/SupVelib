<?php 


    //extract($_POST);
require_once "../core/PDOManager.class.php";
$email= $_POST["email"];

if(isset($email) && !empty($email)){

    try {
        $PDOmanager = new PDOManager();
        $pdo = $PDOmanager->instantiatePDO();

        $sql = $pdo->query("SELECT * FROM users WHERE email = '$email' ");
        $sql = $sql->fetch(PDO::FETCH_ASSOC);

        if($sql){
            echo "Email is taken";
        }else{
            if(filter_var($email,FILTER_VALIDATE_EMAIL) === false)
            {
               echo 'Email is not valid';
           }
           else
           {
              echo 'Email is okay';
          }

      }
  } catch (PDOException $e) {
    echo "error register";
}

}




?>
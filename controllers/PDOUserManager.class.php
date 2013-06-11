<?php
	require_once("../core/PDOManager.class.php");
	require_once("../model/User.class.php");
    session_start();
	
	class PDOUserManager{
		public function authenticate($email, $password){
			$error_connexion = new Exception("error login", 10);
			try{
				$PDOmanager = new PDOManager();
				$pdo = $PDOmanager->instantiatePDO();
				
				$sql = $pdo->query("SELECT * FROM users WHERE email = '$email' AND password = '$password'");
				$sql = $sql->fetch(PDO::FETCH_ASSOC);
					
				if( $sql ){
					$user = new User($sql["id"], $sql["email"],$sql["password"]);
					return $user;
				} else {
					throw $error_connexion;
				}

			} catch (Exception $e){
				echo "Access Denied";
			}
		}
		public function register($email, $password, $confirm){

            $PDOManager = new PDOManager();
			$pdo = $PDOManager->instantiatePDO();


			if ($password == $confirm)
			{

				try {
					$sql = $pdo->prepare('INSERT INTO users(email, password) VALUES(:email, :password)');

					$sql->execute(array(
					':email' => $email,
					':password' => sha1($password)
					));
						
					} catch (Exception $e) {
						echo "error register";	
				}

            }else{
                header("Location:/suplink/view/");
            }






		
		}


	}
?>

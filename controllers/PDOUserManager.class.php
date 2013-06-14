<?php
require_once("../core/PDOManager.class.php");
require_once("../model/User.class.php");
require_once("../APIFB/src/facebook.php");

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


    public function fbConnect(){
        $PDOManager = new PDOManager;
        $pdo = $PDOManager->instantiatePDO();

        $facebook = new Facebook(array(
            'appId' => '280805358731935',
            'secret' => '53d12fb6597388f76fc344874d72001f'
        ));

        $user = $facebook->getUser();

        if(empty($user)){
            header('location:'.$facebook->getLoginUrl(array(
                'locale' => 'fr_FR'
            )));
        }
        else{
            $me = $facebook->api('/me');
        }

        if(isset($me)){
            $fql = "SELECT uid,name,pic_big FROM user WHERE uid = $user";
            $param = array(
                'method' => 'fql.query',
                'query' => $fql,
                'callback' => ''
            );

            $fb = $facebook->api($param);
            $fb = $fb[0];


            $query = $pdo->prepare("SELECT * FROM users WHERE facebook_id = :fb_id");
            $query->execute(array(
                'fb_id' => $user
            ));

            $data = $query->fetch(PDO::FETCH_ASSOC);

            if(empty($data)){
                $pseudo = $fb['name'];
                $password = sha1(uniqid());
                $img_url = $fb['pic_big'];
                $req = $pdo->prepare("INSERT INTO users(pseudo, password, facebook_id,  img_url) VALUES(:pseudo, :password,:fb_id, :img_url)");
                $req->execute(array(
                    'pseudo' => $pseudo,
                    'password' => $password,
                    'fb_id' => $user,
                    'img_url' => $img_url
                ));

                $query2 = $pdo->prepare("SELECT id FROM users WHERE facebook_id = :fb_id");
                $query2->execute(array(
                    'fb_id' => $user
                ));

                $data2 = $query2->fetch(PDO::FETCH_ASSOC);
                $id = $data2["id"];
                $fb_id = $pdo->lastInsertId();
            }
            else{

                $pseudo = $data['pseudo'];
                $password =$data['password'];
                $fb_id = $data['facebook_id'];
                $img_url = $fb['pic_big'];
                $id = $data['id'];
            }

            $USER = new User($id, $pseudo,null, $password,$fb_id, $img_url);
            header("location: index.php");
            return $USER;
        }
    }

}
?>
<?php
/**
 * Created by JetBrains PhpStorm.
 * User: occul_000
 * Date: 16/06/13
 * Time: 19:12
 * To change this template use File | Settings | File Templates.
 */

require_once("../core/PDOManager.class.php");

class PDOFavorisManager {

    public function addFavorite($name,$user_id,$address){
        $PDOManager = new \PDOManager();
        $pdo = $PDOManager->instantiatePDO();

        $query = $pdo->prepare("INSERT INTO favoris(name,user_id,adresse) values(:name,:user_id,:address) ");
        $query->execute(array(
            "name"=>$name,
            "user_id"=>$user_id,
            ":address"=>$address
        ));

    }

    public function showFavorite($user_id){
        $PDOManager = new PDOManager;
        $pdo = $PDOManager->instantiatePDO();

        $query = $pdo->prepare("SELECT * FROM favoris WHERE user_id = :userId");
        $query->execute(array(
            'userId' => $user_id
        ));

        $data = $query->fetchAll();


        echo '<table class="table table-hover"> <thead><tr><th>Nom</th><th>Adresse</th></tr></thead>';

        foreach($data as $row){

            echo '<tr class="favorite">' . '<td>' . $row["name"] . '</td>';
            echo '<td>' . $row["adresse"] . '</td>';
            echo '<td> <a class="close" href=../controllers/delete_favoris.php?id=' . $row["id"] . '> &times;' . '</td> </a> </tr>';
        }

        echo '</table>';



    }

    public function delete($urlId){
        $PDOManager = new PDOManager;
        $pdo = $PDOManager->instantiatePDO();

        $query = $pdo->prepare('DELETE FROM favoris WHERE id = :id');
        $query->execute(array(
            'id' => $urlId
        ));
    }

}
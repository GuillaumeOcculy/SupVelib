<?php
//define("PATH", "/Users/Chedly/Sites/suplink/");
require_once("../core/PDOManager.class.php");
require_once("../model/Url.class.php");
/**
 * Created by JetBrains PhpStorm.
 * User: Chedly
 * Date: 27/02/13
 * Time: 17:48
 * To change this template use File | Settings | File Templates.
 */

class PDOUrlManager{

    public function addUrl($name, $url, $userId){
        try{
            $PDOmanager = new PDOManager();
            $pdo = $PDOmanager->instantiatePDO();
            $number= rand(50000,149999);
            $shortUrl= base_convert($number,24,36); // to have a url with 5 chars. We convert to base 24
            $urlRegister= $pdo->prepare(" INSERT INTO urls(name,url,shortUrl,dateUrl,userId) VALUES (:name, :url, :shortUrl,CURDATE(), :userId)");
            $urlRegister->execute(array(
                ':name' => $name,
                ':url' => $url,
                ':shortUrl' => $shortUrl,
                ':userId' => $userId
            ));

        }catch (PDOException $e){
            echo $e->errorInfo;
        }


    }
    private  function findAllUrls(){ //useful for debugging and administration.
        try {
            $PDOmanager = new PDOManager();
            $pdo = $PDOmanager->instantiatePDO();

            $urls = $pdo->query("SELECT id,name,url,shortUrl,click, DATE_FORMAT(dateUrl, '%d/%m/%Y') AS dateUrl,active,userId FROM urls");
            $urls = $urls->fetchAll(PDO::FETCH_ASSOC);

            return $urls;
            
        } catch (PDOException $e) {
            echo $e->errorInfo;
        }
           

    }

    public  function findUrlsById($userId){
        $PDOManager = new PDOManager();
        $pdo = $PDOManager->instantiatePDO();

 
        $results = $pdo->query("SELECT id,name,url,shortUrl,click, DATE_FORMAT(dateUrl, '%d/%m/%Y') AS dateUrl,active,userId FROM urls WHERE userId='$userId' ");
        $results = $results->fetchAll(PDO::FETCH_ASSOC);
 
        return $results;
 
    }
    public function deleteUrl($urlId,$userId){
        $PDOManager = new PDOManager();
        $pdo = $PDOManager->instantiatePDO();
        $result= $pdo->prepare("DELETE FROM urls WHERE id = :urlId && userId = :userId ");
        $result->execute(array(
            ':urlId' => $urlId,
            ':userId'=> $userId
            )
        );

    }
    public function changeActive($currentActive, $urlId){
        $PDOManager = new PDOManager();
        $pdo = $PDOManager->instantiatePDO();

        if ($currentActive ==1) {
            $newActive= 0;
        }else{
            $newActive=1;
        }
        $querys= $pdo->prepare("UPDATE urls SET active = :newActive WHERE id = :urlId");
        $querys->execute(array(
            ':newActive' => $newActive,
            ':urlId' => $urlId
            )
        );

    }




}
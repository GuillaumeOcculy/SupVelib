<?php

class Favoris {

    private $id;
    private $name;
    private $user_id;
    private $latitude;
    private $longitude;

    function __construct($id, $latitude, $longitude, $name, $user_id)
    {
        $this->id = $id;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->name = $name;
        $this->user_id = $user_id;
    }



    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;
    }





    public function setLongitude($longitude)
    {
        $this->longitude = $longitude;
    }


    public function getLongitude()
    {
        return $this->longitude;
    }


    public function setName($name)
    {
        $this->name = $name;
    }


    public function getName()
    {
        return $this->name;
    }


    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }


    public function getUserId()
    {
        return $this->user_id;
    }

    public function getLatitude()
    {
        return $this->latitude;
    }


    public function setId($id)
    {
        $this->id = $id;
    }


    public function getId()
    {
        return $this->id;
    }

}
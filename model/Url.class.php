<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Chedly
 * Date: 27/02/13
 * Time: 17:48
 * To change this template use File | Settings | File Templates.
 */

class Url{
    private $id, $name, $shortname, $active;

    function __construct( $id, $name, $shortname)
    {

        $this->id = $id;
        $this->name = $name;
        $this->shortname = $shortname;
    }

    public function setId($id)
        {
        $this->id = $id;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setShortname($shortname)
    {
        $this->shortname = $shortname;
    }

    public function getShortname()
    {
        return $this->shortname;
    }




}
<?php
/**
 *  @author : Bourguiba Chedli
 */
class User
{
    private $id;
    private $email;
    private $password;


    function __construct($id, $email, $password)
    {
        $this->email = $email;
        $this->id = $id;
        $this->password = $password;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getEmail(){
        return $this->email;
    }
    public function getPassword(){
        return $this->password;
    }
    public function setPassword($password){
        $this->password = $password;
    }
    public function setEmail($email){
        $this->email = $email;
    }
}
?>
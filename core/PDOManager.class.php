<?php 

	/**
	* @author: Bourguiba Chedli
	*/
	class PDOManager
	{
		private $PDO_DB = "supvelib";

		private $PDO_USER = "root";
		private $PDO_PASS = "";
		public function instantiatePDO(){

			try {
				$pdo = new PDO("mysql: host=localhost; dbname=".$this->PDO_DB,$this->PDO_USER,$this->PDO_PASS);
                $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				return $pdo;
			} catch (PDOException $e) {
				die("PDO Connection failure");
			}
					
		}
			
	}

 ?>
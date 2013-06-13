<?php
/**
 * Created by JetBrains PhpStorm.
 * User: occul_000
 * Date: 13/06/13
 * Time: 15:38
 * To change this template use File | Settings | File Templates.
 */

require_once("../controllers/PDOUserManager.class.php");

$userManager = new PDOUserManager();
$user = $userManager->fbConnect();

$_SESSION["user"] = $user;
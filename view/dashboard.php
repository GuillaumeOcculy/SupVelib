<?php
//define("PATH", "/Users/Chedly/Sites/suplink/");
require_once("../model/User.class.php");
require_once("../controllers/PDOUrlManager.class.php");

session_start();
    if(isset($_SESSION['user'])){

        $user = $_SESSION['user'];



    }else{
        header("Location:/suplink/view/");
    }
   $urlManager = new PDOUrlManager();
   $urls = $urlManager->findUrlsById($user->getId());
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="/suplink/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/suplink/css/miniproject.css" />

    <title>Dashboard</title>
</head>


<body>
<div class="navbar navbar-static-top">
    <div class="navbar-inner">
        <a class="brand" href="dashboard.php"> SupLink</a>
        <ul class="nav pull-left">
            <li class="divider-vertical"></li>
            <li><a href="dashboard.php"> <i class="icon-home icon-white"> </i>  <?php echo $user->getEmail(); ?></a></li>
        </ul>
       
        <ul class="nav pull-right">
            
            <li><a href="logout.php">Logout</a></li>
            <li class="divider-vertical"></li>
            <li><a href="about.php">About</a></li>
        </ul>
    </div>
</div>
<div class="container">
    <div class="jumbotron">
        <h1>SupLink</h1>
        <p class="lead">Another URL shortener</p>

    </div>
    <hr>
    <div class="alert alert-info fade in" style="display : none">

    </div>
    
        <form  method="post" class="form-inline" id="urlform" action="../controllers/url_check.php">
        <input type="text" class="input-large name" name="name" placeholder="Name" required>
        <input type="url" class="input-large url" name="url" placeholder="http:// "required>
        <button type="submit" class="btn-large btn-inverse">Generate</button>
          <img  id="loaderurl" style="display: none; width: 20px; height: 20px; margin-left: 20px;" src="../img/ajax-loader.gif" alt="Loader">
        
        </form>
        <hr>

        <table class="table table-striped table-hover  table-bordered ">
            <thead class="info">
                <tr>
                    <th>Name</th>
                    <th>Original URL</th>
                    <th>Shortened URL</th>
                    <th>Clicks</th>
                    <th>Date created</th>
                    <th>Enable/Disable</th>
                    <th>Remove</th>

                </tr>
            </thead>

            <tbody>
                
                <?php
                    foreach( $urls as $url){
                        if($url['active']){
                            echo '<tr class="success"><td>' . $url["name"] . '</td>';
                            echo '<td>' . $url["url"] . '</td>';
                            echo '<td> <a href="/suplink/'.$url['shortUrl'].'">  suplink.com/' . $url['shortUrl'] . ' </a></td>';
                            echo '<td>' . $url["click"] . '</td>';
                            echo '<td>' . $url["dateUrl"] . '</td> ';
                            echo '<td> <a href="../controllers/active.php?id='.$url['id'].'&active='.$url['active'].'">   <i class="icon-ok"> </i>  </a> </td>';
                            echo '<td> <a href="../controllers/delete.php?id='.$url['id'].'"><i class="icon-trash"> </i>  </a> </td> </tr>';
                        }else{
                            echo '<tr class="error"> <td>' . $url["name"] . '</td>';
                            echo '<td>' . $url["url"] . '</td>';
                            echo '<td> <a href="">  suplink.com/' . $url['shortUrl'] . ' </a></td>';
                            //echo '<td> <a href="link.php?k='.$url['id'].'"> suplink  </a> </td> ';
                            echo '<td>' . $url["click"] . '</td>';
                            echo '<td>' . $url["dateUrl"] . '</td> ';
                            echo '<td> <a href="../controllers/active.php?id='.$url['id'].'&active='.$url['active'].'"> <i class="icon-off "> </i> </a></td>';
                            echo '<td> <a href="../controllers/delete.php?id='.$url['id'].'"> <i class="icon-trash"> </i>  </a> </td> </tr>';
                        }
                    }
                ?>

            </tbody>
        </table>

</div>

<!-- (TIP) Google returns the latest version of jquery in the 1 series (from 1.0 to 1.9.9) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script type="text/javascript" src="../js/miniproject.js"></script>

</body>

</html>
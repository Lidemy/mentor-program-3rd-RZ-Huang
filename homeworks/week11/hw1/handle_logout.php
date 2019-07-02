<?php

  if(isset($_COOKIE["certificate"])) {
    setcookie("certificate",'');
    header('Location: ./index.php');
  } 

?>
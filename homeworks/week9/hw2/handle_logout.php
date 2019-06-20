<?php

  if(isset($_COOKIE["nickname"])) {
    setcookie("nickname",'');
    setcookie("id", '');
    header('Location: ./index.php');
  } 

?>
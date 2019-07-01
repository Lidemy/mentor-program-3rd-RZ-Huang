<?php
  require_once('./conn.php');
  $id = $_POST['id'];
  $content = $_POST['text']; 
  $sql ="UPDATE RZ_comments SET content = '$content' WHERE id = $id";
  $result = $conn->query($sql);
  if ($result) {
    header('Location: ./login.php');
  } else {
    die('Failed: ' . $conn->error);
  }
?>
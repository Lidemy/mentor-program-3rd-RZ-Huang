<?php
  include_once('./utils.php');
  require_once('./conn.php');
  $id = $_POST['id'];
  $content = $_POST['text']; 

  $stmt = $conn->prepare("UPDATE RZ_comments SET content = ? WHERE id = ? and name = ?");
  $stmt->bind_param("sss", $content, $id, getNickname($conn));
  
  if ($stmt->execute()) {
    header('Location: ./login.php');
  } else {
    die('Failed: ' . $conn->error);
  }

?>
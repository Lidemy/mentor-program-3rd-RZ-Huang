<?php
  include_once('./utils.php');
  require_once("./conn.php");
  $id = $_GET['id'];

  $stmt = $conn->prepare("DELETE FROM RZ_comments WHERE id = ? and name = ?");
  $stmt->bind_param("ss", $id, getNickname($conn));
  
  if($stmt->execute()) {
    header("Location: ./login.php");
  } else {
    echo "Failed delete: $conn->error";
  }
?>
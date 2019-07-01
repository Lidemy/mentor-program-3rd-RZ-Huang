<?php
  require_once("./conn.php");
  $id = $_GET['id'];
  $sql = "DELETE FROM RZ_comments WHERE id = $id";
  if($conn->query($sql)) {
    header("Location: ./login.php");
  } else {
    echo "Failed delete: $conn->error";
  }
?>
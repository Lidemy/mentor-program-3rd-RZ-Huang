<?php
  require_once('./conn.php');
  $id = $_POST['id'];
  $content = $_POST['text']; 

  $sqlCertificateUsername = "SELECT username FROM RZ_users_certificate WHERE id = '$_COOKIE[certificate]' ";
  $resultCertificateUsername = $conn->query($sqlCertificateUsername);
  $rowCertificateUsername = '';
  if ($resultCertificateUsername->num_rows > 0) {
    $rowCertificateUsername = $resultCertificateUsername->fetch_assoc()['username'];
  }
  

  $sql ="UPDATE RZ_comments SET content = '$content' WHERE id = $id and name = '$rowCertificateUsername'";
  $result = $conn->query($sql);
  if ($result) {
    header('Location: ./login.php');
  } else {
    die('Failed: ' . $conn->error);
  }
?>
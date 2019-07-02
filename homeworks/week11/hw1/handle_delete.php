<?php
  require_once("./conn.php");
  $id = $_GET['id'];

  $sqlCertificateUsername = "SELECT username FROM RZ_users_certificate WHERE id = '$_COOKIE[certificate]' ";
  $resultCertificateUsername = $conn->query($sqlCertificateUsername);
  $rowCertificateUsername = '';
  if ($resultCertificateUsername->num_rows > 0) {
    $rowCertificateUsername = $resultCertificateUsername->fetch_assoc()['username'];
  }

  $sql = "DELETE FROM RZ_comments WHERE id = $id and name = '$rowCertificateUsername'";
  if($conn->query($sql)) {
    header("Location: ./login.php");
  } else {
    echo "Failed delete: $conn->error";
  }
?>
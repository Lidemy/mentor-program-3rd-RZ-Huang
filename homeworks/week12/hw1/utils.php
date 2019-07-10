<?php
  require_once('./conn.php');
  

  function gethtmlspecialchars($str) {
    return htmlspecialchars($str, ENT_QUOTES , 'utf-8');
  }


  function getNickname($conn) {
    $stmtCertificateUsername = $conn->prepare("SELECT username FROM RZ_users_certificate WHERE id = ?");
    $stmtCertificateUsername->bind_param('s', $_COOKIE['certificate']);
    $stmtCertificateUsername->execute();
    $resultCertificateUsername = $stmtCertificateUsername->get_result();

    $rowCertificateUsername = '';
    if ($resultCertificateUsername->num_rows > 0) {
      $rowCertificateUsername = $resultCertificateUsername->fetch_assoc()['username'];
    }
    
    $stmtNickname = $conn->prepare("SELECT nickname FROM RZ_users WHERE username = ? ");
    $stmtNickname->bind_param('s', $rowCertificateUsername);
    $stmtNickname->execute();
    $resultNickname= $stmtNickname->get_result();
    
    $rowNickname = '';
    if ($resultNickname->num_rows > 0) {
      $rowNickname = $resultNickname->fetch_assoc();
    }

    return $rowNickname['nickname'];
  }
?>
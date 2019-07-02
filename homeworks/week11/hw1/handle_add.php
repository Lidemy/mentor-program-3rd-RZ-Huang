<?php
  require_once('./conn.php');

  $content = $_POST['text'];

  $sqlCertificateUsername = "SELECT username FROM RZ_users_certificate WHERE id = '$_COOKIE[certificate]' ";
  $resultCertificateUsername = $conn->query($sqlCertificateUsername);
  $rowCertificateUsername = '';
  if ($resultCertificateUsername->num_rows > 0) {
    $rowCertificateUsername = $resultCertificateUsername->fetch_assoc()['username'];
  }
  
  
  $sqlNickname = "SELECT nickname FROM RZ_users WHERE username =  '$rowCertificateUsername' ";
  $resultNickname = $conn->query($sqlNickname);
  $rowNickname = '';
  if ($resultNickname->num_rows > 0) {
    $rowNickname = $resultNickname->fetch_assoc();
  }
  

  if (empty($content)) {
?>
    <a href="./login.php">返回留言頁面</a>
    <br>
<?php
    die('Empty data');
  }

  $sql = "INSERT INTO RZ_comments(name,content) VALUE('$rowNickname[nickname]','$content')";
  $result = $conn->query($sql);
  if ($result) {
    header('Location: ./login.php');
  } else {
    die('Failed: ' . $conn->error);
  }
?>
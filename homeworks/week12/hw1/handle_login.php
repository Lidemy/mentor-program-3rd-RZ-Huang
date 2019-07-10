<?php
  require_once('./conn.php');
  
  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username) || empty($password) ) {
?>
    <a href="./index.php">返回登入頁面</a>
    <br>
<?php
    die('有空格尚未填入，請填入正確的格式');
  }
  
  $stmt = $conn->prepare("SELECT * FROM RZ_users WHERE username=?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result =$stmt->get_result();
  if ($result->num_rows > 0) {
    $row =$result->fetch_assoc();
  }
  
  $passwordHash = $row['password'];
  

  function getRandomString() {
    $certificateStr = '';
    $str = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+.";
    for ($i = 0; $i < 32; $i +=1) {
      $randomIndex = rand(0, strlen($str)-1);
      $certificateStr = $certificateStr . $str[$randomIndex] ;
    }
    return $certificateStr;
  }

  $stmtGetCertificate = $conn->prepare("SELECT id FROM RZ_users_certificate WHERE username=?");
  $stmtGetCertificate->bind_param("s", $username);
  $stmtGetCertificate->execute();
  $resultGetCertificate = $stmtGetCertificate->get_result();
  $rowGetCertificate = $resultGetCertificate->fetch_assoc();

  if($row && password_verify($password, $passwordHash)) {
    if($resultGetCertificate->num_rows > 0) {
      setcookie("certificate", $rowGetCertificate['id'], time()+3600*24);
    } else {
      $certificateID = getRandomString();
      $stmtGetCertificate = $conn->prepare("INSERT INTO RZ_users_certificate(id,username) VALUES(?, ?)");
      $stmtGetCertificate->bind_param("ss", $certificateID, $username);
      $stmtGetCertificate->execute();
      setcookie("certificate", $certificateID, time()+3600*24);
    }
    header('Location: ./login.php');
  } else {
    echo "Login Failed";
?>
    <br>
    <a href="./index.php">返回登入頁面</a>
<?php
  }
?>

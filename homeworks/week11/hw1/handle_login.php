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
  
  $sql = "SELECT * FROM RZ_users where username = '$username'";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $nickname = $row['nickname'];
  $id = $row['id'];
  $passwordHash = $row['password'];
  
  

  setcookie("nickname", $nickname, time()+3600*24);
  setcookie("id", $id, time()+3600*24);
  
  function getRandomString() {
    $certificateStr = '';
    $str = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+.";
    for ($i = 0; $i < 32; $i +=1) {
      $randomIndex = rand(0, strlen($str)-1);
      $certificateStr = $certificateStr . $str[$randomIndex] ;
    }
    return $certificateStr;
  }

  

  if($row && password_verify($password, $passwordHash)) {
    $sql = "SELECT id FROM RZ_users_certificate where username = '$username'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    if ($_COOKIE['certificate' . $username]) {
      if ($_COOKIE['certificate' . $username] === $row['id']) {
          header('Location: ./login.php');
      } else {
        echo "Error Id";
      }
    } else if ($row) {
      setcookie("certificate" . $username,$row['id']);
      header('Location: ./login.php');
    } else {
      $certificateID = getRandomString();
      setcookie("certificate" . $username,$certificateID);
      $sql = "INSERT INTO RZ_users_certificate(id,username) VALUES('$certificateID', '$username')";
      $result = $conn->query($sql);
      header('Location: ./login.php');
    }
  } else {
    echo "Login Failed";
?>
    <br>
    <a href="./index.php">返回登入頁面</a>
<?php
  }
?>
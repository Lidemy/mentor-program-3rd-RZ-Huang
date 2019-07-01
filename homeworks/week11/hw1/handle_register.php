<?php
  require_once('./conn.php');
  
  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];
  $passwordHash = password_hash($password, PASSWORD_DEFAULT);
  
  if (empty($username) || empty($password) || empty($nickname)) {
?>
    <a href="./register.php">返回註冊頁面</a>
    <br>
<?php
    die('有空格尚未填入，請填入正確的格式');
  }

  $sql = "INSERT INTO RZ_users(username, password, nickname) VALUE('$username','$passwordHash','$nickname')";
  $result = $conn->query($sql);

  
  
  if ($result) {  
    header('Location: ./index.php');
  } else {
?>
    <a href="./register.php">返回註冊頁面</a>
    <br>
<?php
    die('Failed: ' . $conn->error);
  }

?>
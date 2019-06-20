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
  $sql = "SELECT * FROM RZ_users where username = '$username' AND password = '$password'";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $nickname = $row['nickname'];
  $id = $row['id'];
  setcookie("nickname", $nickname, time()+3600*24);
  setcookie("id", $id, time()+3600*24);
  
  if($row) {
    header('Location: ./login.php');
  } else {
    echo "Login Failed";
?>
    <br>
    <a href="./index.php">返回登入頁面</a>
<?php
  }
?>
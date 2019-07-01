<?php
  require_once('./conn.php');

  $content = $_POST['text'];
  $nickname = $_COOKIE['nickname'];

  if (empty($content)) {
?>
    <a href="./login.php">返回留言頁面</a>
    <br>
<?php
    die('Empty data');
  }

  $sql = "INSERT INTO RZ_comments(name,content) VALUE('$nickname','$content')";
  $result = $conn->query($sql);
  if ($result) {
    header('Location: ./login.php');
  } else {
    die('Failed: ' . $conn->error);
  }
?>
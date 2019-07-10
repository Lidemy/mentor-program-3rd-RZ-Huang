<?php
  include_once('./utils.php');
  require_once('./conn.php');

  $content = $_POST['text'];

  if (empty($content)) {
?>
    <a href="./login.php">返回留言頁面</a>
    <br>
<?php
    die('Empty data');
  }

  $stmt = $conn->prepare("INSERT INTO RZ_comments(name,content) VALUE(?, ?)");
  $stmt->bind_param("ss", getNickname($conn), $content);
  $stmt->execute();

  if ($stmt) {
    header('Location: ./login.php');
  } else {
    die('Failed: ' . $conn->error);
  }
?>

<?php
  include_once('./utils.php');
  require_once('./conn.php');

  $content = $_POST['text'];
  $commentId = $_POST['comment-id'];

  if (empty($content)) {
?>
    <a href="./login.php">返回留言頁面</a>
    <br>
<?php
    die('Empty data');
  }

  $stmt = $conn->prepare("INSERT INTO RZ_sub_comments(comment_id, username, content) VALUE(?, ?, ?)");
  $stmt->bind_param("sss", $commentId, getNickname($conn), $content);
  $stmt->execute();

  if ($stmt) {
    header('Location: ./login.php');
  } else {
    die('Failed: ' . $conn->error);
  }

?>
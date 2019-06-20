<?php require_once('./conn.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Comments</title>
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <div class="container">
    <h1 class="title"> 即 時 留 言 板</h1>
    <p>＊本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</p> 
    <a class="logout" href="./handle_logout.php">登出</a>
    <h2>留言版</h2>
    <div class="input-comment">
      <form method='POST' action="./handle_add.php">
        <div class="name">
          <?php 
            echo "「" . $_COOKIE['nickname'] . "」 您好！請在下方留下您想要說的話" ;
          ?>
        </div>
        <div class="text">
          <textarea name="text" rows='10' cols='70'></textarea>
        </div>
          <input type="submit" value="提交留言">
      </form>
    </div>
    <h2>訪客留言</h2>
    <div class="comments">
      <?php
        $sql = "SELECT * FROM RZ_comments ORDER BY created_at DESC LIMIT 50";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
            echo "<div class='comment'>";
            echo "  <h1>$row[name]</h1>";
            echo "  <h2>$row[content]</h2>";
            echo "  <p>$row[created_at]</p>";
            echo "</div>";
          }
        }
      ?>
  </div>
</body>
</html>
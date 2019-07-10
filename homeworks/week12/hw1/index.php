<?php 
  include_once('./utils.php');
  require_once('./conn.php'); 
?>
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
    <h2>登入帳號</h2>
    <div class="input-comment">
      <form method='POST' action="./handle_login.php">
        <div class="username">
          使用者帳號：<input name="username">
        </div>
        <div class="password">
          使用者密碼：<input name="password" type="password">
        </div>
        <input type="submit" value="登入">
        <a class="register" href="./register.php">新會員註冊<a>
      </form>
    </div>
    <h1>訪客留言</h1>
    <div class="comments">
      <?php
        $sqlAllComments = "SELECT * FROM RZ_comments ORDER BY created_at DESC";
        $resultAllComments = $conn->query($sqlAllComments);
        $AllCommentsCount = $resultAllComments->num_rows;
        $AllPages = ceil($AllCommentsCount/20);
        $page = '';
        
        if(!isset($_GET['page'])) {
          $page = 1;
        } else {
          $page = intval($_GET['page']);
        }
        $pageBeginningComment = ($page-1)*20;
        $sqlPageComments = "SELECT * FROM RZ_comments ORDER BY created_at DESC LIMIT $pageBeginningComment,20";
        $resultPageComments = $conn->query($sqlPageComments);

        $sqlAllSubComments = "SELECT * FROM RZ_sub_comments ORDER BY created_at DESC";
        $resultAllSubComments = $conn->query($sqlAllSubComments);

        if ($resultPageComments->num_rows > 0) {
          while($rowPageComments = $resultPageComments->fetch_assoc()) {
            echo "<div class='comment'>";
            echo "  <div class='main-comment'>";
            echo "    <h1>". gethtmlspecialchars($rowPageComments['name']) ."</h1>";
            echo "    <h2>". gethtmlspecialchars($rowPageComments['content']) ."</h2>";
            echo "    <p class='createdTime-comment'>" . gethtmlspecialchars($rowPageComments['created_at']) . "</p>";
            echo "  </div>";
        ?>
              <div class="sub-comments">           
        <?php 
          
          if ($resultAllSubComments->num_rows > 0  ) {
            while($rowAllSubComments = $resultAllSubComments->fetch_assoc()) {
              if ($rowPageComments['id'] === $rowAllSubComments['comment_id']) { 
                if ($rowAllSubComments['username'] === $rowPageComments['name']) {
                  echo "<div class='sub-comment pop'>";
                } else {
                  echo "<div class='sub-comment'>";
                }
                echo "  <h1>". gethtmlspecialchars($rowAllSubComments['username']) . "</h1>";
                echo "  <h2>". gethtmlspecialchars($rowAllSubComments['content']) . "</h2>";
                echo "  <p>". gethtmlspecialchars($rowAllSubComments['created_at']) . "</p>"; 
                echo "</div>";
              }
            }   
            $resultAllSubComments->data_seek(0);
            
          }
        ?>             
              </div>
          </div>
        <?php
          }
        }

          echo "<div class='pages'>";
        for($i=1 ;$i <=$AllPages; $i++){
          echo "<a href='?page=$i' class='page'>" . $i . "</a>";         
        }
          echo "</div>";

        if (isset($_GET['page'])) {
          echo "<div class='view-pages'>";
          echo "第 " . $_GET['page'] . "/" . $AllPages . " 頁";
          echo "</div>";
        } else if($AllPages == 0) {
          echo "<div class='view-pages'>";
          echo "第 " . 0 . "/" . $AllPages . " 頁";
          echo "</div>";
        } else {
          echo "<div class='view-pages'>";
          echo "第 " . 1 . "/" . $AllPages . " 頁";
          echo "</div>";
        }
      ?>
  </div>
</body>
</html>
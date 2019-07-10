<?php 
  require_once('./conn.php'); 
  include_once('./utils.php');
  
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
    <a class="logout" href="./handle_logout.php">登出</a>
    <h2>留言版</h2>
    <div class="input-comment">
      <form method='POST' action="./handle_add.php">
        <div class="name">
          <?php 
            echo "「" . gethtmlspecialchars(getNickname($conn)) . "」 您好！請在下方留下您想要說的話" ;
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
            if($rowPageComments['name'] === getNickname($conn)) {
              echo "  <a href='./edit.php?id=$rowPageComments[id]' class='edit-comment'>編輯</a>";
              echo "  <a href='./handle_delete.php?id=$rowPageComments[id]' class='delete-comment'>刪除</a>";
            }
            
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
                if($rowAllSubComments['username'] === getNickname($conn)) {
                  echo "  <a href='./sub_edit.php?id=$rowAllSubComments[id]' class='edit-comment'>編輯</a>";
                  echo "  <a href='./handle_sub_delete.php?id=$rowAllSubComments[id]' class='delete-comment'>刪除</a>";    
                }           
                echo "</div>";
              }
            }   
            $resultAllSubComments->data_seek(0);
            
          }
        ?>             
                <h1>回覆留言</h1>
                <form method='POST' action="./handle_sub_add.php">
                  <div class="text">
                    <textarea name="text" rows='10' cols='60'></textarea>
                  </div>
                    <input type="submit" value="提交留言">
        <?php

                    echo "<input type='hidden' name='comment-id' value='$rowPageComments[id]' >";
                  
        ?>
                </form>
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
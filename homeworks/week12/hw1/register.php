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
    <h2>註冊帳號</h2>
    <div class="input-comment">
      <form method='POST' action="./handle_register.php">
        <div class="username">
          使用者帳號：<input name="username">
        </div>
        <div class="paswword">
          使用者密碼：<input name="password" type="password">
        </div>
        <div class="nickname">
          暱稱：<input name="nickname">
        </div>
          <input type="submit" value="註冊">
      </form>
    </div>
  </div>
</body>
</html>
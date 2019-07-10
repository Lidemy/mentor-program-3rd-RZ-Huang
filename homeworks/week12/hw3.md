## 請說明 SQL Injection 的攻擊原理以及防範方法
##### 攻擊原理：

藉由 POST 表單讓使用者所輸入的值變成程式碼的一部分，因此可以依此特性去輸入一些特定資源去竊取或者是攻擊網站後端的資料庫。

##### 舉例：

`"SELECT * FROM user WHERE name = 'Jason' and password = '123'";`
這一行表示說要從 `user` 這個 `table` 抓取 `name` 為 `Jason` 且 `password` 為 `123` 的這筆資料。

`"SELECT * FROM user WHERE name = '' or 1=1 -- ''and password = '123'";`
如果今天我們這樣子寫，表示說 `--` 後面的字串都省略不看，然後 `name` 選取到的資料只要是空字串或者是 `true`（1=1 為 true）就會撈到這筆資料，這行的意思其實就是不管怎樣**一定會撈到資料，這也就是說駭客不需要有會員就能登入網站**。

##### 解決方法：prepare statement

原先的 php 使用 sql 語法選擇資料庫資料：

```
$sql = "SELECT * FROM users WHERE username='$username' and password='$password'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
```

改成 prepare statement 寫法：

```
$stmt = $conn->prepare("SELECT * FROM users WHERE username=? and password=?"); //準備好 query
$stmt->bind_param("ss", $username, $password); // 加入參數，第一個參數是資料型態，s 是 string，有幾個參數就加入幾個資料型態。
$stmt->execute(); // 執行
$result =$stmt->get_result(); // 得到抓回來的資料
if ($result->num_rows > 0) {
  $row =$result->fetch_assoc();
}
```
[w3school MySQL prepare ](https://www.w3schools.com/php/php_mysql_prepared_statements.asp)
[Prepared Statements](https://www.php.net/manual/en/mysqli.quickstart.prepared-statements.php)

## 請說明 XSS 的攻擊原理以及防範方法

##### 攻擊原理：

也是輸入的值可以成為程式的一部分，這個是針對網頁的部分，也就是說可以惡意透過填入表單把一些 Javascript 的語法塞到程式碼去執行，進而操控整個網頁的運作。

##### 舉例：

把網站的名稱叫做 `<h2>Hello</h2>`，但是會被解析成 html，而不是純文字，因此必須對於特定的符號做特殊的處理。

##### 解決方法：跳脫

```
<?php
  echo htmlspecialchars("<h2>hello</h2>", ENT_QUOTES , 'utf-8');
?>
```

 php 有個 `htmlspecialchars()` 的內建函式可以把 html 的特殊字元轉換成一般的文字顯示，這樣就可以避免有心人士利用標籤隨意更動後台程式與資料庫。

[htmlspecialchars() 語法參考](http://www.webtech.tw/info.php?tid=PHP_htmlspecialchars_函數功能與用法)


## 請說明 CSRF 的攻擊原理以及防範方法

##### 攻擊原理：
CSRF 是一種在不同的 domain 下，偽造成是使用者向某個網站做出了使用者本身無意的請求的攻擊方式，但實際上使用者可能是在別的網頁上瀏覽，只因為點擊了某個夾帶請求某個網站資訊的連結而在進入連結的同時，對那個網站做出了請求，不過前提是使用者在那個網站是已經認證的情況下，那發送出去這個請求的同時理所當然地夾帶著使用者的資料（Session ID之類的)，也就會和使用者本人發送出去一樣，但實際上卻不是使用者自願的。

##### 舉例：
有一個超連結如下：
```
<img src='https://www.bank.com/delete?id=1' width='0' height='0' />
<a href='./index'>有趣的網站</a>
```
當點擊這個超連結的同時（看不到 img 標籤內容），還會同時發送出去一個在 `www.bank.com` 網頁下，刪除 `id=1` 資料的這個動作。

##### 解決方法：
1. 圖形驗證與簡訊驗證
在每次要執行更改任何資料前都得驗證一遍，算是很好的解決方式，因為攻擊者不會知道隨機的簡訊碼或是圖形為何。這個方式雖然很安全，可是卻會使得使用者每次要執行動作都得驗證一遍，使用者體驗就會變得很差。
2. CSRF token
在表單中加入一個由 server 隨機產生值的隱藏欄位，在第一次提交表單的時候把這個值儲存在 server 的 session 當中。之後的每次提交表單 server 都會比對表單中隱藏欄位的值與 session 裡面的值是否一樣。由於這個值是 server 隨機產生並且 session 會做更換，攻擊者不會知道實際上的值為何，因此就沒辦法做攻擊。只是這個方式有個缺點就是如果你的 server 是可以 cross origin 而且接受攻擊者處在的 domain 的話還是有可能遭受攻擊。
3. Double Submit Cookie
與 CSRF token 有點像，只是這個方式是在 client 端加上 server 隨機產生的值的 cookie，原本 CSRF token 是設定在 session，這個改為在 client 端的 cookie 上。這個方式的判定是 server 會去看 cookie 內的值與表單裡面的值是否一致，一致的話表示就是使用者所發的。攻擊者想要攻擊的話因為 request 過來的 cookie 不會有那個值因此不會被判定為使用者所發送的。只是這個方式有個小缺點是，當攻擊者知道你 domain 下面的 subdomain 就有辦法產生相對應的 cookie。
4. Chrome 的 SameSite cookie
Chrome 瀏覽器在 51版本有提供 `SameSite` 的功能，這個功能可以在設定 cookie 的時候的後面加上 `SameSite`，而它有兩個模式，一個是默認的 `Strict`，一個是 `Lax`。
`Strict` 這個用法的意思是說只要不是在同一個網站底下所發出的 request，都不會被加上 cookie，也就是由超連結標籤點進來的 request 也不算，因此不會被加上 cookie，可以徹底的抵擋住使用超連結方式的攻擊。可是這樣就會變成說，我從某人那邊貼給我某個網站的連結，我點進去這個網站都會是登出的狀態，這個方式就會導致使用者體驗不太好，還得再重新登入。如果要解決這種使用者體驗麻煩，可以參考 Amazon 的方式為使用者設定兩組 cookie，第一組 cookie 不設定 SameSite 單純就是給由其他方式進來的使用者所使用的，但這組 cookie 沒辦法做資料上面的操作，另外一組 cookie 則是負責較敏感需要注意的操作才使用這個 cookie，這樣的話確實可以阻絕攻擊者的攻擊並且讓使用者體驗變得比較好，只是在撰寫程式碼的部分會比較麻煩一些。
`Lax` 為另外一個模式，比起 `Strict` 模式，它比較寬鬆，`<a>`、`<link rel="">`、`<form method="GET">` 這些方式都可以帶上 cookie，只是 POST、PUT、DELETE 這些表單方式還是不允許帶上 cookie 的。這個模式的特性是它可以在使用者從其他網站進入網站時，會是登入的狀態之外，還可以擋掉攻擊者的攻擊，唯獨比較遺憾的是它無法擋掉 GET 方法的攻擊。

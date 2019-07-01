## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
雜湊是一種對資料的處理方式，透過雜湊函式把雜湊值和要查找的項目作相對應的關聯，這樣的方式方便用於搜尋。而加密是把資料經過某種可讓資料弄得很隨機看不出原本資料的型態的方式，經由解密可以還原原始的資料內容。因為雜湊演算法的不可逆性質，因此常常被用來當作加密密碼的方式，經過雜湊過的密碼才不至於當資料庫被駭入時導致所有 client 的帳號輕易地被利用，也就是多了一層保護。 

## 請舉出三種不同的雜湊函數
* MD5（Message-Digest）：普遍、穩定、快速的特點，常常被應用在一些普通的資訊安全檢查中，因其目前已可以被 collision（碰撞），所以對於想採用極機密方式的安全機制得另外選擇其它雜湊函數。
* SHA（Secure Hash Algorithm）：由 FIPS（聯邦資訊處理標準）所認證的雜湊演算法。其中一個特點是只要輸入一樣的值就會有一樣的輸出值，反之，如果輸入不同的值就會跑出不同的輸出值。目前總共有四代（包括 0 代）的演進，SHA-0 是 SHA-1 的前身，發布後很快地就被撤回。SHA-1 在早期被當作是取代 MD5 的雜湊函數，廣泛應用於各個安全協定，包括 TLS、SSL、SSH 等，但是目前已經被 Google 與合作的研究小組破解。SHA-2（包括 SHA-256、SHA-224、SHA-384 等） 的演算法和 SHA-1 相似，算是目前可以使用的安全雜湊函式之一。SHA-3 所使用的演算法和以前的 SHA 系列都不一樣，目前可和 SHA-2 替換使用的雜湊函式。
* RIPEMD：以 MD4 的演算法為基礎下所製作出來的演算法。類似於 SHA-1 演算法。其最常見版本為 RIPEMD-160，這個版本主要是針對設計給學術方面領域的人所使用。

## 請去查什麼是 Session，以及 Session 跟 Cookie 的差別
* Session：可以把它當作是一張通行證，它是個很像亂碼的一長串字串。在有需要會員系統的網站，當會員第一次登入時，伺服器端收到這個登入的 request 後，會在資料庫建立對應於這個會員資料的一個 Session ID，並且伺服器端在 response 回去結果給 client 端的同時，會強制命令 client 端要把這張 Session ID 隨身攜帶在身上，存放於 cookie，於是每當每次 client 端發送 request 就會一併附上這張 Session ID ，伺服器端就會在資料庫尋找是否有對應的資料，簡單說就是伺服器端不管會員其他的資料，只認這張 Session 就知道會員是否為本人。
* Cookie：可以當作是 client 端的一個容器，把一些需要儲存在瀏覽器上的資料放到這個容器中，之後就會一直存在這個 cookie 值（直到過期）。那要如何放這些資料到 cookie 上？伺服器端會發送「set-cookie」的指令，當 client 端收到這個指令則會把相對應的 cookie 與它的值儲存於瀏覽器中（包括各種 cookie 額外的設定）。每當 Server 端有身份識別要求時，就會去看 client 端 request 過去的 cookie 內容是否有符合資料庫的資料。

##  `include`、`require`、`include_once`、`require_once` 的差別
include、include_once、require、require_once 都可以載入其它 php 的檔案內容，include、include_once 和 require、require_once 的差別在於 include、include_once 的檔案在匯入時如果沒成功或是沒被找到，後面的程式依舊會執行，反之， require、require_once 只要匯入失敗，程式即停止。而 include、require 之於 include_once、require_once 的差別為 include_once、require_once  所要載入的檔案只會被執行一次，也就是說後面如果再匯入同樣的檔案則會被忽略掉。總結來說，如果要確保匯入的檔案需要確實地被執行且在檔案中不重複載入相同檔案，請選擇「require_once」最保險。
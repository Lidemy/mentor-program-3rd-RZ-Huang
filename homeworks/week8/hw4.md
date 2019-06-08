## 什麼是 Ajax？
Asynchronous JavaScript and XML，一種可以進行非同步處理的技術，應用在瀏覽器端網頁開發的技術。非同步的好處是向 Server 請求資料不需要等待資料傳送到本地才有辦法進行程式碼的下一步。當瀏覽器收到 response 後，會立即更新網頁的內容。

## 用 Ajax 與我們用表單送出資料的差別在哪？
使用 Ajax 可以使我們不需要換頁面就可以拿到 Server 的 response 資料。

## JSONP 是什麼？
JSON with padding，padding 指的是擴充的意思。由於同源政策的關係，除非 Server 端有設定 `access-control-allow-origin`，否則非同源的網域會無法拿到 Server 端的資料，因此我們必須藉由  JSONP 這個方式去取得 Server 的資料。

## 要如何存取跨網域的 API？
如果 Server 端沒有設定 `access-control-allow-origin`，我們可以藉由 JSONP 的方式取得資料。實際的使用方式是在 html 檔案的 ` <body> ` 裡放上 ` <script src = "你要 GET 資料的網域名稱"></script>` ，並且在這之前建立好要接收 response 回來的資料的函式。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

第四週我們串接 Web API 的方式是藉由 node.js 直接與 API 交換資料，本地端與 Server 端之間是直接傳遞，這之間沒有任何物件干擾（先忽略作業系統），也就是說並沒有所謂跨網域的問題。而這週由於我們是透過瀏覽器幫我們傳遞資料到 Server 端，而 Server 端回傳的資料也會先經過瀏覽器的篩選才會 response 回來給 Client 端，經過瀏覽器的資料傳遞就會有跨網域的可能發生。而由於使用瀏覽器的安全起見，訂定了**同源政策**，這個政策雖然可以讓我們發 request 到非同源的 Server 端，但 response 的資料會被瀏覽器擋住，因此就會發生所謂的跨網域沒辦法接收到 response 資料的問題。也因為這樣，才會有所謂的 CORS 產生。
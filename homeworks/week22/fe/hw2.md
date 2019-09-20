## React Router 背後的原理你猜是怎麼實作的？
應該是使用類似 history API 的東西，history API 有個 `pushState` 的方法可以把網址列帶到設定的位置去，但實際上並不會讓 browser 去真正載入新的一份 html 檔案，而這樣的原理就像是 React Router 換網址卻不換頁。另外 React Router 還有一個使用 hash 的方法，在 history 當中也有類似的用法：`window.location.hash`。

## SDK 與 API 的差別是什麼？
SDK：懶人包。裡面包含大大小小有關開發所需的各式各樣的工具與文件。

API：可以用作在開發某一個功能上的引用。

也就是說，API 有的東西，SDK 都包含在裡面，但反之卻不是。

## 在用 Ajax 的時候，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？
Server 端要設定 `Access-Control-Allow-Credentials:true` ，另外 `Access-Control-Allow-Origin` 不可為 `*`，否則會與 `Access-Control-Allow-Credentials:true` 有所衝突。

Client 端則需設定 `withCredentials: true`。


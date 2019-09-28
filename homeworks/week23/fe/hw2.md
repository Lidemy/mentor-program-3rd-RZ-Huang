## 為什麼我們需要 Redux？

由於在 React 上要傳遞 `props` 的時候需要一層一層的 component 傳遞下去，舉例現在有 A、B、C、D 四個 component，D 包在 C 中，C 包在 B 中，B 包在 A中，A 要傳它的 `state` 到 D 的時候勢必得經過 B 與 C，但是問題是 B 與 C 並不需要 A 的 `state`，也就是說這樣到頭來專案一大，寫下來會變得有一堆沒必要的參數在 component 中傳來傳去的。

而 Redux 可以解決上述 React 的這種問題。

## Redux 是什麼？

Redux 語法中，有個全域的儲存地，稱為 store，可以儲存任何你想要放的值在裡面，也因此，任何 component 要拿 store 裡面的值就只要 call Redux 的方法就可以拿到值，而不用再像原生 React 這麼麻煩。

記得 Redux 是個獨立的 library，可以用在其他地方，也可以獨立使用，未必要與 React 合在一起使用，不過常常會拿來與 React 一起使用。

## Single Page Application 是什麼？有哪些頁面一定要用這個架構去設計嗎？

簡稱 SPA，是一種網頁的設計架構，使得網站操作起來就像只有一個頁面，也就是說在操作網站的時候，不會看到一般換頁時呈現的短暫空白畫面。在某些網站中使用 SPA 會讓使用者體驗更佳，使用者不需要等待第一次的按鍵請求回來才可以操作別的按鍵或是瀏覽網站。而有些網站如果不使用 SPA 的架構來設計的話，會變得失去了網站的使用本質，好比說聽音樂的網站，我想要一邊聽音樂，一邊瀏覽歌手的資料或是尋找其它曲目，如果不使用 SPA 會變得每次操作的時候就會換畫面，音樂就會被卡掉了。

## Redux 如何解決非同步（例如說 call API 拿資料）的問題

可以使用非同步的 middleware，比如 `redux-thunk` 或 `redux-promise`，其使得 store 的 `dispatch` 方法不單單只能放入 action，還可以放入 function 等等的資料。
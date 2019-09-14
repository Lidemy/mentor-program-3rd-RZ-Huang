## 為什麼我們需要 React？可以不用嗎？
React.js 本質為 library，而我們使用 library 的目的在於「方便開發」，不用自己寫一堆 Vanilla JS 語法只為了實現某個功能。可以不使用 React，但是當專案的複雜度與規模變大時，使用原生 JavaScript 來寫的話，可能程式碼上的維護性與易讀性相對來說會不佳，進而拖慢專案完成的速度。

## React 的思考模式跟以前的思考模式有什麼不一樣？
以往我們使用 Vanilla JS 要改變 UI 的畫面時，會需要先選到 DOM 的節點，選到之後再針對他的內容視情況增減 DOM 節點，最後再把更新或新建過後的內容插入到相對應的 DOM 節點，畫面才得以改變。

不過也可以每次改變資料或內容就 call 負責 render 的 function，這樣做的好處是你就只要管理儲存資料的地方有確實被更改後，UI 有再被重新 render 過，那資料與畫面間必然同步，而這樣的做法，就類似於 React 的概念。

React 的概念是只要「狀態」一被改變，UI 就會被重新 render 一次，因此我們從頭到尾只要管理「狀態」的改變，就能呈現出相對應的 UI，也因此，少掉了原生 JS 各種 DOM 節點的操作，相對來說程式碼較為簡潔與好維護。

## state 跟 props 的差別在哪裡？
state：組件自身的狀態，組件本身可以修改、控制自己的狀態，但是外部的組件無法控制其組件的狀態，也無法直接得到其狀態。只要組件的狀態一改變，組件就會 re-render。

props：組件透過 props 從父組件那邊得到參數來進行組件自身的設定，組件無法修改 props 傳進來的參數，也就是組件只能對 props Read-Only，不過可以根據傳進來的 props 設定組件自身的狀態。父組件可以把狀態放到 props 來給組件拿到父組件的狀態，這樣只要父組件的狀態一改變，組件也會跟著 re-render。

簡單區分 state 和 props 就是組件參數（資料）的來源分成內部自身與外部獲取。
## 請列出 React 的 lifecycle 以及其代表的意義
* shouldComponentUpdate：設定狀態改變是否會重新 render。
* componentDidMount：當 render 完畫面、HTML 結構都已安置後要做的事情，通常用作一些初始化的設定。
* componentWillUnmount：當組件的節點要從畫面消失前，所要做的動作，通常是用在 `componentDidMount` 有設定東西的情形，為了防止當組件消失時找不到組件產生錯誤，所以都會另外加上 `componentWillUnmount` 把之前設定的東西給取消。
* componentDidUpdate：只要 state 被改變就會觸發的 lifecycle，不過如果 shouldComponentUpdate 設定不重新 render 的話，`componentDidUpdate` 的改變就會無效。

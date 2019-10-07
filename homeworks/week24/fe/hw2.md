## Redux 如何解決非同步（例如說 call API 拿資料）的問題

使用 redux middleware，讓 action 傳到 reducer 以前再做一些額外的處理，把處理完後產出的新 action 傳到 reducer。

而 redux-thunk 和 redux-promise 兩套 redux middleware 的 library 可以解決非同步的問題。
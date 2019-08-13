# Event Loop

### 輸出結果：
```
1
3
5
2
4
```



### 原因：

因為 Javascript 的 single thread 特性，一次只能執行一個執行緒，所以需要 Event Loop 的機制實施非同步的操作，否則會嚴重大塞車。

在 call stack 首先會放入`console.log(1)`執行，執行完之後移除`console.log(1)`。接著 call stack 再放入`setTimeout(() => { console.log(2)}, 0)`，發現是一個非立即執行的物件，把它給放入 Web APIs 運作直到運作完成才會放入 callback queue 等待，直到 call stack 的東西都被執行完才會把 callback queue 的東西放到 call stack 執行。因此接著`console.log(3)`被執行完之後從 call stack 上移除，再來`setTimeout(() => { console.log(4)}, 0)`和前面的`setTimeout`一樣的動作完成後就會被放到 callback queue 等待，接著`console.log(5)`被執行，完成之後 Event Loop 偵測沒有 call stack 東西需要被執行了，開始找 callback queue 有沒有東西，偵測到有，把第一個進去的`setTimeout(() => { console.log(2)}, 0)`拉到 call stack 上執行，執行`setTimeout`裡面的動作，也就是`console.log(2)`，`console.log(2`)會先被拿出來放到 call stack 上才會開始執行，執行完成後移除`console.log(2)`，再移除`setTimeout(() => { console.log(2)}, 0)`，接著 Event Loop 偵測到 call stack 又沒東西了，又去找 callback queue 有沒有東西，偵測到還有一個`setTimeout(() => { console.log(4)}, 0)`的物件，和前面`setTimeout`一樣的執行步驟，全部都執行完成並移除完成之後，程式即結束。
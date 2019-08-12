# hw2：Event Loop + Scope

### 執行結果：

```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

### 原因：

首先要知道的是`var`的作用域是以 function 為主而不是 `{ }`block，所以每一圈的 `setTimeout` 的`console.log(i)`實質上不會存到當圈的`i`值，而是最終`i`的值為何就會輸出多少。

第一個迴圈： i = 0 （接著加 1）

`console.log('i: ' + 0)`被放到 call stack，然後執行，執行完之後被移除，接著`setTimeout(() => {console.log(i)}, i * 1000)` 被放到 call stack，因為是非立即執行的物件，所以被放到 Web APIs 運作，運作完之後會被放到 callback queue 等待。

第二個迴圈： i = 1（接著加 1）

`console.log('i: ' + 1)`被放到 call stack，然後執行，執行完之後被移除，接著`setTimeout(() => {console.log(i)}, i * 1000)` 被放到 call stack，因為是非立即執行的物件，所以被放到 Web APIs 運作，運作完之後會被放到 callback queue 等待。

第三個迴圈： i = 2（接著加 1）

`console.log('i: ' + 2)`被放到 call stack，然後執行，執行完之後被移除，接著`setTimeout(() => {console.log(i)}, i * 1000)` 被放到 call stack，因為是非立即執行的物件，所以被放到 Web APIs 運作，運作完之後會被放到 callback queue 等待。

第四個迴圈： i = 3（接著加 1）

`console.log('i: ' + 3)`被放到 call stack，然後執行，執行完之後被移除，接著`setTimeout(() => {console.log(i)}, i * 1000)` 被放到 call stack，因為是非立即執行的物件，所以被放到 Web APIs 運作，運作完之後會被放到 callback queue 等待。

第五個迴圈： i = 4（接著加 1）

`console.log('i: ' + 4)`被放到 call stack，然後執行，執行完之後被移除，接著`setTimeout(() => {console.log(i)}, i * 1000)` 被放到 call stack，因為是非立即執行的物件，所以被放到 Web APIs 運作，運作完之後會被放到 callback queue 等待。

跑完第五個迴圈之後 `i = 5`，所以迴圈已進不去，接著 call stack 當中已經沒東西，所以開始找 callback queue 裡面的東西，發現有`setTimeout(() => {console.log(i)}, i * 1000)`，把第一個放到 call stack 上執行，執行`setTimeout`裡面的`console.log(i)`，因為目前執行的當下`i=5`，所以輸出結果會是`5`，執行完畢後移除`console.log(i)`，接著再移除`setTimeout`，發現 call stack 當中又沒東西，去找 callback queue 裡面有沒有東西，有，一樣是`setTimeout(() => {console.log(i)}, i * 1000)`，然後重複上一個`setTimeout`一樣的步驟。因為迴圈跑五次的關係，callback queue 裡面有五個`setTimeout(() => {console.log(i)}, i * 1000)`，所以會跑出五個`5`的結果，五個都執行完後，程式即結束執行。
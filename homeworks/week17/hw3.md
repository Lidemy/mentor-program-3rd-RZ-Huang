# Hoisting
### 執行結果：
```
undefined
5
6
20
1
10
100
```

### 原因：

程式碼：

```javascript
1 var a = 1
2 function fn(){
3  console.log(a)
4  var a = 5
5  console.log(a)
6  a++
7  var a
8  fn2()
9  console.log(a)
10  function fn2(){
11    console.log(a) 
12    a = 20
13    b = 100
14  }
15 }
16 fn()
17 console.log(a)
18 a = 10
19 console.log(a)
20 console.log(b)
```

首先先針對 `global` 的 EC 做初始化，第 1 行宣告的 `a` 變數和第 2 行的`fn`函式放入 `globalEC`的 `VO`，`scopeChain`則是 `globalEC` 自身的`VO`，另外要設置 `fn`函式的`[[Scope]]`為 `globalEC`的`scopeChain`：
```
globalEC: {
	VO: {
		a: undefined,
		fn: function
	}
	scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain
```
接著執行`globalEC`，第 1 行`a`變數賦值`1`：
```
globalEC: {
	VO: {
		a: 1,
		fn: function
	}
	scopeChain: [globalEC.VO]
}
```
第 16 行呼叫`fn()`於是建立`fnEC`的初始化，第 4 行宣告`a`變數和第 10 行的`fn2`函式放入`fnEC`的`AO`，`scopeChain`為`fn` 自身的`fnEC.AO`加上`fn.[[Scope]]`所以為`[fnEC.AO, globalEC.VO]`，另外要設置`fn2`函式的`[[Scope]]`為`fnEC`的`scopeChain`：

```
fnEC: {
	AO: {
		a: undefined,
    	fn2: function
  	}
    scopeChain: [fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain
```
接著執行`fnEC`，第 3 行`console.log(a)`的`a`結果是上方的`undefined`，第 4 行`a`變數賦值`5`，於是第 5 行的`console.log(a)`的`a`結果為 `5`：
```
fnEC: {
	AO: {
		a: 5,
    	fn2: function
  	}
    scopeChain: [fnEC.AO, globalEC.VO]
}
```
接著第 6 行幫`a`變數加`1`，因此`a`變數更新為`6`，第 7 行不用理它因為 `a`已經宣告過：
```
fnEC: {
	AO: {
		a: 6,
    	fn2: function
  	}
    scopeChain: [fnEC.AO, globalEC.VO]
}
```
第 8 行呼叫`fn2()`，因此建立`fn2EC`的初始化，因為都沒宣告任何變數與函式，因此`AO`為空，而`scopeChain`為`fn2EC`自身的`fn2EC.AO`加上`fn2.[[Scope]]`所以為`[fn2EC.AO, fn.AO, globalEC.VO]`：
```
fn2EC: {
	AO: {

  	}
    scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}
```
接著執行第 11 行`console.log(a)`，先在`fn2EC.AO`尋找有無`a`變數，發現沒有，所以經由`scopeChain`接著去尋找`fnEC.AO`中是否有`a`變數，發現有，是`6`，因此`console.log(a)`的結果為`6`。

接著第 12 行把`a`變數賦值為`20`，但是`fn2EC.AO`中沒有`a`變數，所以`fnEC.AO`中的`a`變數被更改為`20`：
```
fnEC: {
	AO: {
		a: 20,
    	fn2: function
  	}
    scopeChain: [fnEC.AO, globalEC.VO]
}
```
接著第 13 行把`b`變數賦值為`100`，但是`fn2EC.AO`中沒有`b`變數，所以去尋找`fnEC.A`中有無`b`變數，發現也沒有，所以去尋找`globalEC.VO`中有無`b`變數，發現也沒有，所以在`globalEC.VO`新增了`b`變數，並同時賦值`100`：
```
globalEC: {
	VO: {
		a: 1,
		fn: function,
		b: 100
	}
	scopeChain: [globalEC.VO]
}
```
`fn2()`都執行完之後，執行第 9 行`console.log(a)`，在`fnEC.AO`中找到`a`變數為`20`，所以結果為`20`。

`fn()`也都執行完之後，執行第 17 行`console.log(a)`，在`global.VO`中找到`a`變數為`1`，所以結果為`1`。

接著第 18 行`a`賦值`10`，所以更改`global.VO`中的`a`變數為`10`：
```
globalEC: {
	VO: {
		a: 10,
		fn: function,
		b: 100
	}
	scopeChain: [globalEC.VO]
}
```
因此接著第 19 行的`console.log(a)`的結果為`global.VO`中的`a`變數：`10`。

最後第 20 行的`console.log(a)`的結果為`global.VO`中的`b`變數：`100`。

# this
### 結果：
```
2
2
undefined
```

### 原因：
`this`回傳的結果不是看`this`被定義時的位置處，而是看它是怎麼被呼叫的。

1. `obj.inner.hello()`：可以把它看作`obj.inner.hello.call(obj.inner)`，因此`this.value`就是我們去找`obj.inner.this`的值為多少。
2. `obj2.hello()`：可以把它看作`obj2.hello.call(obj2)`，`obj2` 又等於`obj.inner`，所以可以看做`obj.inner.hello.call(obj.inner)`，因此答案就跟第 1 個的一樣。
3. `hello()`：可以把它看作`hello.call()`，`call()`的參數是空的，所以會指向`global`（如果在 broswer 則是`window`），而這題的`global`當中沒有`value`值，因此為`undefined`。


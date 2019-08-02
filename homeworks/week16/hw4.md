## CSS 預處理器是什麼？我們可以不用它嗎？
如果單純使用 css 來做切版的話，往往容易造成結構鬆散，整體內容雜亂，變得不容易維護。

CSS 預處理器就是為了要解決原生 CSS 的問題而出現。 CSS preprocessor 以撰寫程式語法的方式透過 compile 來生成 CSS 的結構，等於是說先在預處理器的檔案上做 CSS 相關的樣式撰寫後，轉成瀏覽器看得懂的 CSS 結構。

因為使用了像是寫程式一樣的語法，比如 Variables、Nesting、Parents、Mixin 等等，使得我們在寫 CSS 結構的時候可以更便利與易讀之外，事後的維護性更改顯得會輕鬆許多。

常見使用的 CSS preprocessor 有 Sass/Scss、Less、Stylus 這三款，基本上三款的語法與用法大同小異，因此只要熟悉一款，其它款相對也很容易上手。

可以不使用 CSS preprocessor 嗎？ 可以的，因為 CSS preprocessor 就像工具一樣，今天你要把一台車扛起來不用工具也可以，但是要找很多人一起幫忙；但今天只要有一個千斤頂，你一個人也可以把車抬起來，相對省事許多。


## 請舉出任何一個跟 HTTP Cache 有關的 Header 並說明其作用。
### Expires 

`Expires` 的 Header 功用主要是在設定 Cache 的過期時間，比如說：

`Expires：Wed, 31 Jul 2019 15:30:30 GMT `

指的是這個 Cache 在上述時間一到即到期。

藉由第一次的 Response 給瀏覽器這組 Header，瀏覽器收到這組 Header 後會好好地保存起來，每當瀏覽器要 request 之前，會先檢查這組 Header 上面的時間與「現在時間」做比對，如果沒有過期，那麼瀏覽器就不會發 request 出去，並且會從拿取儲存在 Cache 中的資料，並且 Status Code 那邊會顯示 200（from disk cache）；假如過期，那麼瀏覽器就會重新發 request 拿取新的資料（假如有更新資料）並更新 `Expires` Header的時間或單純只是更新 `Expires` Header的時間並沿用舊的資料。

但是使用 Expires 要注意的是它上面的時間是與本機電腦的時間做比對，它是個絕對時間，因此會有個瑕疵是，當今天本機電腦的時間不準，或是被調到已經和現實時間相去甚遠的時間，那麼 Expires 就會發現過期，因此瀏覽器就得再重新發送 request 更新資料。

為了解決這個問題，我們可以使用 `Cache-Control: max-age=31536000 `，其 `max-age` 的參數數字單位為秒數，也就是過了 31536000 秒（一年）後 cache 才會過期。

實務上 `Expires` 和 `Cache-Control: max-age` 可以一起用，但根據 RFC2616 的定義，會以 `max-age` 的時間為主。



## Stack 跟 Queue 的差別是什麼？
### 堆疊 Stack
這個資料結構可以把它想像成在堆餐盤，第一個餐盤放好後，接著第二個餐盤放在第一個餐盤上面，第三個餐盤放在第二個餐盤上面，以此類推。而當今天要拿餐盤的時候會從最上面的餐盤開始拿，因此最後放上去的餐盤會先被拿走，也就是說，第一個放好的餐盤會是最後被拿走的，這邊它有個名詞是：「First In, Last Out」，先放上去的，最後才會被拿走。

### 佇列 Queue
想成是在排隊，比如說在排一間餐廳，一定是排在第一個的人先進去，在來是第二位，第三位，以此類推，因此它有個名詞是：「First In, First Out」，先到的，會被先處理。
## 請去查詢資料並解釋 CSS Selector 的權重是如何計算的（不要複製貼上，請自己思考過一遍再自己寫出來）

如果在同一個元素下，加上了不同的選擇器，選擇器的權重會影響這個元素最後呈現的結果。

而權重的大小為 id > attribute > tag ，只要所有選擇器加起來 id 最多的就勝出，id 一樣的話再來才是看 attribute，attribute 一樣的話才是看 tag。

以下的所有選擇器以分數來計算，像這樣：0, 0, 0 ，由左到右是 id、attribute、tag。

HTML body 的內容：

```
    <div class="main">
      <div class="second">
        <div class="third" id="only">
          Hello
        </div>
      </div>
    </div>
```

CSS的內容：

```
/* 0, 1, 0 */
.main {
  color: blue;
}

/* 0, 2, 0 */
.main > .second {
  color: pink;
}

/* 0, 2, 2 */
div.main > div.second {
  color: green;
}

/* 0, 3, 3 */
div.main > div.second > div.third {
  color: yellow;
}

/* 0, 3, 3 */
div.main div.second div.third {
  color: purple;
}

/* 1, 0, 0 */
#only {
  color: chocolate;
}
```

最後是 `#only` 的權重最大，因為它有 1 個 id 的分數，後面分數多少都沒差，因此 `Hello` 的顏色是 `chocolate`。

假如有兩個權重分數一樣的，那麼在 CSS 檔案相對下面的選擇器會成為最後的結果。

### 另外還有兩個比 id 權重還大的例外

第一個是 「**inline style**」，直接在 HTML 標籤上面加的屬性，可以把它看作 1, 0, 0, 0 ，如下的`style="color:aqua;"`：

```
    <div class="main">
      <div class="second">
        <div class="third" id="only" style="color:aqua;">
          Hello
        </div>
      </div>
    </div>
```

最後顏色會是 `aqua` 色。

接著比 inline style 更大的，那就是「**!important**」，在 CSS 屬性後面直接加，可以把它看作 1, 0, 0, 0, 0 ：

```
/* 0, 3, 3 */
div.main > div.second > div.third {
  color: yellow !important;
}
```

我們在上面的 CSS 檔案內容權重為 0, 3, 3 的選擇器的 `color` 屬性後面加上 `!important`，最終結果就會是黃色而不是 `chocolate`色。

但實務上我們比較少用到 inline style 還有 !important，主要是維護性不好，知道 **id > attribute > tag** 這三個關係更為重要。
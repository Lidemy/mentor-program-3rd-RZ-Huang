## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

1. &lt;i&gt;：在範圍內的文字以斜體呈現。為行內元素（inline elements）。
   
   e.g. `<p>Hello , My name is <i>RZ-Huang</i>.</p>`
   上面的呈現結果會是這個樣子： 「Hello , My name is *RZ-Huang*.」
   
   
   
2. &lt;tbody&gt;：用在 &lt;table&gt; 標籤裡，用來表示整張表格裡面的「內容」區塊，非「第一行的 head」與「最後一行的 foot」，是個語意元素。

   

3. &lt;hr&gt;：用在主題與主題中斷處的分隔線，一條長長的分隔線，就像下面這樣：
-------

## 請問什麼是盒模型（box modal）

每個元素的高寬、padding 和 border 加起來的區域，等於這個元素「實際」上在頁面中佔的空間，可以把它看作一個四四方方盒子。


## 請問 display: inline, block 跟 inline-block 的差別是什麼？

* display: inline

  代表元素：「a、span」，行內元素，元素會連著前面的元素做並排，在同一行裡不換行，並連著後面的元素。假如超過一行的寬度還是會自動跳到下一行。對於區塊相關的屬性的設定不會有反應（比如寬度與高度），但是如果對行內元素設定 `padding`，元素會被撐大增加總高寬，但是內容不會動。

* display: block

  代表元素：「div、p、h1~h6」，區塊元素，元素會佔滿一整行，所謂的一整行就是 viewport 由左到右的寬度，可對於其設定區塊相關的屬性。

* display: inline-block

  代表元素：「input、select、button」，可以讓區塊浮起來就像被設定 `float` 的感覺，但是不需要再設定什麼 `clear: both`。同時擁有 block element 的特性（可設定區塊相關屬性），和 inline element 的特性（可和其它元素水平排列）。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

* position: static

  每個元素的預設值，表示元素的位置會在「瀏覽器依照 html 由上到下排列的順序渲染後」自動配置的位置上。

* position: relative

  以元素的 `position: static` 的位置為基準，利用 `top`、`left`、`bottom`、`right`設定值做上下左右的相對移動。元素移動後，最原始的位置的空間會留著，不會不見。

* position: absolute

  元素會去尋找在它上面是否有非 `position: static` 的父元素（不限於緊鄰一層的父元素），如果有，就以那個父元素的位置為基準，利用 `top`、`left`、`bottom`、`right`設定值做上下左右的相對移動；如果沒有，就以 viewport 左上角那一點為基準，做相對移動。元素最原始的位置的空間會不見，因此在它下方的元素會遞補上來。元素所在的位置不會干涉到其它元素的位置配置。

* position: fixed

  元素根據 viewport 左上角那一點為基準，做相對移動，並且在任何時刻，不管頁面如何上下左右滾動，都會保持在那一個位置。元素最原始的位置的空間會不見，因此在它下方的元素會遞補上來。元素所在的位置不會干涉到其它元素的位置配置。
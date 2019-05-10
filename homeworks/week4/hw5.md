## 請以自己的話解釋 API 是什麼

API，全名是 Application Programming Interface，應用程式介面，重點在「介面」兩個字，不是說它真的有個實體的圖形介面（人機介面）在那邊給我們做操控，而是我們把它當作一個溝通媒介看待，透過這個介面，我們可以讓機器與機器之間做溝通。生活上常見的例子像是 USB 隨身碟，透過「隨身碟這個介面」我們可以讓裡面的資料傳輸到電腦當中，也可以把電腦當中的資料傳輸到隨身碟裡來。而 Web API 是 developer 常用的開發工具，透過 Web API 讓我們的專案能夠使用人家已經打包好的資料或者是功能，便於我們開發，但我們首先要確定可以跟它後台的伺服器做連線（溝通），接著就可以去取得別人家放在那邊的資料、資訊或者是功能，甚至有些還可以上傳、更改、更新我們本地資料到別人家去。API 的核心重點就是**機器與機器之間可以做雙向的溝通**。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

1. 102 Processing：表示伺服器已經收到 request ，並且正在處理當中，只是還沒有 response。
2. 205 Reset Content：此狀態是當完成 request 時，告訴使用者會重新設定當初發送的 request 的內容。
3. 408 Request Timeout：在伺服器規定時間內沒等到客戶端完整的 reuqest 訊息，即關閉這個連結，或者是在沒有 request 的情況下就 shut down 也會出現。有些時候不會看到 408 的出現，只會看到連不上網頁這個情形。 

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

### Website：http://goodrestaurant.com

### Data Type：JSON



You can use ：

`curl http://goodrestaurant.com/api/data`

to **get all data** 



**Get a single data**

[GET]

Request：

`/api/data/1`

Response：

{

​	"data": {

​		"name": "ding tai phone",

​		"food": "samll long bao",

​		"Location": "tapei,Taiwan",

​		"parking": "service"

​		"id":  "101"

​	}

}



**Create a new data**

[POST]

Request：

`/api/data`

{
​		"name": "a la hua gua",

​		"food": "derimagasi",

​		"Location": "Kuala Lumpur,Malaysia",

​		"parking": "non-service"	

}

Response：

{
​		"name": "a la hua gua",

​		"food": "derimagasi",

​		"Location": "Kuala Lumpur,Malaysia",

​		"parking": "non-service"	

​		"id": 1001

​		"createTime": "2019-05-10-10:25:30GMT"

}



**Delete a data**

[DELETE]

Request：

`/api/data/2`

Response：

`204`



**Update a data**

[PATCH]

Request：

`/api/data/2`

{
​		"name": "a la hua gua",

​		"food": "derimagasi",

​		"Location": "Kuala Lumpur,Malaysia",

​		"parking": "service"	

}

Response：

{
​		"name": "a la hua gua",

​		"food": "derimagasi",

​		"Location": "Kuala Lumpur,Malaysia",

​		"parking": "service"	

​		"updateTime": "2019-05-10-11:00:23GMT"

}


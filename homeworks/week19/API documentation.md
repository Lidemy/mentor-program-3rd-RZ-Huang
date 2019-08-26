Base URL:  http://rzmessageboard.tw/TodoList/api.php

| 說明          | HTTP Method | 路徑    | 參數                                                   |
| ------------- | ----------- | ------- | ------------------------------------------------------ |
| 獲取所有 todo | GET         | /       | 無                                                     |
| 讀取單一 todo | GET         | ?id=:id | id: todo 的 id 值                                      |
| 刪除 todo     | DELETE      | /       | id: todo 的 id 值                                      |
| 新增 todo     | POST        | /       | itemName: todo 名稱                                    |
| 修改 todo     | PATCH       | /       | itemName: todo 名稱<br>state: 1（未完成）; 2（已完成） |

### JSON

```json
[
    {
        "id": "1",
        "item_name": "測試測試",
        "state": "1",
        "created_at": "2019-08-26 15:36:03"
    },
    {
        "id": "2",
        "item_name": "CS75 Video",
        "state": "1",
        "created_at": "2019-08-26 15:36:35"
    },
    {
        "id": "4",
        "item_name": "Hey~~~",
        "state": "1",
        "created_at": "2019-08-26 15:37:15"
    }
]
```

### 範例

##### 獲取所有 todo

`curl -X GET http://rzmessageboard.tw/TodoList/api.php`

##### 讀取 id 為 2 的 todo

`curl -X GET http://rzmessageboard.tw/TodoList/api.php?id=2`

##### 刪除 id 為 2 的 todo

` curl -X DELETE http://rzmessageboard.tw/TodoList/api.php -d "id=2"`

##### 新增  todo

`curl -X POST http://rzmessageboard.tw/TodoList/api.php -d "itemName=homework"`

##### 修改 id 為 2 的 todo 名稱

`curl -X PATCH http://rzmessageboard.tw/TodoList/api.php -d "id=2&itemName=clean room"`

##### 修改 id 為 2 的 todo 的狀態

`curl -X PATCH http://rzmessageboard.tw/TodoList/api.php -d "id=2"`


const request = require('request');
const process = require('process');

// 列出前 20 本書的清單
if (process.argv[2] === 'list') {
  request('https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      const json = JSON.parse(body);
      json.forEach((book) => {
        console.log(`${book.id} ${book.name}`);
      });
    });
}

// 列出選擇的 id 的書
if (process.argv[2] === 'read') {
  request(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response, body) => {
      const json = JSON.parse(body);
      console.log(`${json.id} ${json.name}`);
    });
}

// 刪除選擇的 id 的書
if (process.argv[2] === 'delete') {
  request.delete(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response) => {
      console.log(response.statusCode);
    });
}

// 建立一本新的書
if (process.argv[2] === 'create') {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form: {
        name: `${process.argv[3]}`,
      },
    },
    (error, response, body) => {
      console.log(body);
      console.log(response.statusCode);
    },
  );
}

// 更新選擇的 id 的書
if (process.argv[2] === 'update') {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form: {
        name: `${process.argv[4]}`,
      },
    },
    (error, response, body) => {
      console.log(body);
      console.log(response.statusCode);
    },
  );
}

const request = new XMLHttpRequest();
const container = document.querySelector('#container');
const body = document.querySelector('body');
const ticketButton = document.querySelector('.ticket-getting');
let againButton = '';

function test() {
  againButton.addEventListener('click', () => {
    window.location.reload(true);
  });
}

ticketButton.addEventListener('click', () => {
  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
  request.addEventListener('load', () => {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText;
      const json = JSON.parse(response);
      const prizes = json.prize;
      if (prizes === 'FIRST') {
        body.classList.add('sky-color');
        const button = document.createElement('button');
        button.classList.add('again-getting');
        button.innerHTML = '再試一次';
        container.innerHTML = `
            <img src="./plane.jpg" width="600px" height="400px" />
            <p>恭喜你中頭獎了！日本東京來回雙人遊！</p>
      `;
        container.appendChild(button);
        againButton = document.querySelector('button');
        test();
      } else if (prizes === 'SECOND') {
        const button = document.createElement('button');
        button.classList.add('again-getting');
        button.innerHTML = '再試一次';
        container.innerHTML = `
            <img src="./TV.jpg" width="350px" height="500px" />
            <p>二獎！90 吋電視一台！</p>
      `;
        container.appendChild(button);
        againButton = document.querySelector('button');
        test();
      } else if (prizes === 'THIRD') {
        const button = document.createElement('button');
        button.classList.add('again-getting');
        button.innerHTML = '再試一次';
        container.innerHTML = `
            <img src="./youtube.jpg" width="600px" height="400px" />
            <p>恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！</p>
      `;
        container.appendChild(button);
        againButton = document.querySelector('button');
        test();
      } else if (prizes === 'NONE') {
        body.classList.add('thankyou-color');

        const button = document.createElement('button');
        button.classList.add('again-getting');
        button.innerHTML = '再試一次';
        container.innerHTML = `
            <p class="thank">銘謝惠顧</p>
      `;
        container.appendChild(button);
        againButton = document.querySelector('button');
        test();
      } else {
        alert('系統不穩定，請再試一次');
      }
    } else {
      alert('系統不穩定，請再試一次');
    }
  });
  request.addEventListener('error', () => {
    alert('系統不穩定，請再試一次');
  });

  request.send();
});

const request = new XMLHttpRequest();
const container = document.querySelector('#container');
const submitButton = document.querySelector('.submit');
const messageContent = document.querySelector('.message');

submitButton.addEventListener('click', () => {
  request.open('POST', 'https://lidemy-book-store.herokuapp.com/posts', true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send(`content=${messageContent.value}`);
  request.addEventListener('error', () => {
    alert('error');
  });
});

request.open('GET', 'https://lidemy-book-store.herokuapp.com/posts?_limit=20&_sort=id&_order=desc', true);

request.addEventListener('load', () => {
  if (request.status >= 200 && request.status < 400) {
    const json = JSON.parse(request.responseText);
    for (let i = 0; i < json.length; i += 1) {
      const p = document.createElement('p');
      p.innerHTML = `${json[i].id}. ${json[i].content}`;
      p.classList.add('message-itmes');
      container.appendChild(p);
    }
  }
});
request.send();

request.addEventListener('error', () => {
  alert('error');
});

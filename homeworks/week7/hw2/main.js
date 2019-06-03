// email 的驗證沒有做，使用 type="email" 現成的驗證。
// 排版還沒有完全一樣。程式碼太冗長，太多重複性可以合在一起的。

const itemsContainerSelector = document.querySelectorAll('.items-container');
const emailItemSelector = document.querySelector('input[type=email]');
const usernameSelector = document.querySelectorAll('input[type=text]')[0];
const studentTypeSelector = document.querySelectorAll('input[type=radio]');
const currentJobSelector = document.querySelectorAll('input[type=text]')[1];
const howToKnowSelector = document.querySelectorAll('input[type=text]')[2];
const CSBackgoundSelector = document.querySelectorAll('input[type=text]')[3];
const othersSelector = document.querySelectorAll('input[type=text]')[4];

// 加入 p 的選擇器
let mailP;
let usernameP;
let studentTypeP;
let currentJobP;
let howToKnowP;
let CSBackgoundP;

const type1ContentTypeSelector = studentTypeSelector[0].nextElementSibling.innerHTML;
const type2ContentTypeSelector = studentTypeSelector[1].nextElementSibling.innerHTML;

// 生成子節點
function appendChildToContainer(element = 'p', content = '這是必填問題') {
  const newElement = document.createElement(element);
  newElement.classList.add('invalidHint');
  newElement.innerHTML = content;
  return newElement;
}

// 送出檢查必填項目有沒有值
function judgeNoValue(selector, index) {
  if (selector.value.length <= 0) {
    if (!itemsContainerSelector[index].children[0].lastElementChild.classList.contains('invalidHint')) {
      itemsContainerSelector[index].children[0].appendChild(appendChildToContainer());
      itemsContainerSelector[index].classList.add('red');
    }
  }
}

// 送出表單的驗證
function formValidate(event) {
  event.preventDefault();
  event.stopPropagation();
  judgeNoValue(emailItemSelector, 0);
  judgeNoValue(usernameSelector, 1);
  judgeNoValue(currentJobSelector, 3);
  judgeNoValue(howToKnowSelector, 4);
  judgeNoValue(CSBackgoundSelector, 5);

  mailP = document.querySelector('.email>p');
  usernameP = document.querySelector('.username>p');
  studentTypeP = document.querySelector('.student-type>p');
  currentJobP = document.querySelector('.current-job>p');
  howToKnowP = document.querySelector('.how-to-know>p');
  CSBackgoundP = document.querySelector('.CS-backgound>p');


  if (!itemsContainerSelector[0].classList.contains('red') && !itemsContainerSelector[1].classList.contains('red') && !itemsContainerSelector[2].classList.contains('red') && !itemsContainerSelector[3].classList.contains('red') && !itemsContainerSelector[4].classList.contains('red') && !itemsContainerSelector[5].classList.contains('red')) {
    console.log(emailItemSelector.value);
    console.log(usernameSelector.value);
    if (studentTypeSelector[0].checked) {
      console.log(type1ContentTypeSelector);
    }
    if (studentTypeSelector[1].checked) {
      console.log(type2ContentTypeSelector);
    }

    console.log(currentJobSelector.value);
    console.log(howToKnowSelector.value);
    console.log(CSBackgoundSelector.value);
    console.log(othersSelector.value);
    alert('Submitted!');
    window.location.reload();
  }

  // 判定送出後 radio 項目有沒有選
  if (!studentTypeSelector[0].checked && !studentTypeSelector[1].checked) {
    if (!itemsContainerSelector[2].children[0].lastElementChild.classList.contains('invalidHint')) {
      itemsContainerSelector[2].children[0].appendChild(appendChildToContainer());
      itemsContainerSelector[2].classList.add('red');
      studentTypeP = document.querySelector('.student-type>p');
    }
  }
}

document.querySelector('form').addEventListener('submit', formValidate);

// 增加錯誤警示
itemsContainerSelector[0].addEventListener('input', () => {
  if (emailItemSelector.value.length <= 0) {
    if (!itemsContainerSelector[0].children[0].lastElementChild.classList.contains('invalidHint')) {
      itemsContainerSelector[0].children[0].appendChild(appendChildToContainer());
      itemsContainerSelector[0].classList.add('red');
      mailP = document.querySelector('.email>p');
    }
  }
});

itemsContainerSelector[1].addEventListener('input', () => {
  if (usernameSelector.value.length <= 0) {
    if (!itemsContainerSelector[1].children[0].lastElementChild.classList.contains('invalidHint')) {
      itemsContainerSelector[1].children[0].appendChild(appendChildToContainer());
      itemsContainerSelector[1].classList.add('red');
      usernameP = document.querySelector('.username>p');
    }
  }
});

itemsContainerSelector[2].addEventListener('input', () => {
  if (!studentTypeSelector[0].checked && !studentTypeSelector[1].checked) {
    if (!itemsContainerSelector[2].children[0].lastElementChild.classList.contains('invalidHint')) {
      itemsContainerSelector[2].children[0].appendChild(appendChildToContainer());
      itemsContainerSelector[2].classList.add('red');
      studentTypeP = document.querySelector('.student-type>p');
    }
  }
});

itemsContainerSelector[3].addEventListener('input', () => {
  if (currentJobSelector.value.length <= 0) {
    if (!itemsContainerSelector[3].children[0].lastElementChild.classList.contains('invalidHint')) {
      itemsContainerSelector[3].children[0].appendChild(appendChildToContainer());
      itemsContainerSelector[3].classList.add('red');
      currentJobP = document.querySelector('.current-job>p');
    }
  }
});

itemsContainerSelector[4].addEventListener('input', () => {
  if (howToKnowSelector.value.length <= 0) {
    if (!itemsContainerSelector[4].children[0].lastElementChild.classList.contains('invalidHint')) {
      itemsContainerSelector[4].children[0].appendChild(appendChildToContainer());
      itemsContainerSelector[4].classList.add('red');
      howToKnowP = document.querySelector('.how-to-know>p');
    }
  }
});

itemsContainerSelector[5].addEventListener('input', () => {
  if (CSBackgoundSelector.value.length <= 0) {
    if (!itemsContainerSelector[5].children[0].lastElementChild.classList.contains('invalidHint')) {
      itemsContainerSelector[5].children[0].appendChild(appendChildToContainer());
      itemsContainerSelector[5].classList.add('red');
      CSBackgoundP = document.querySelector('.CS-backgound>p');
    }
  }
});


// 移除錯誤警示
itemsContainerSelector[0].addEventListener('input', () => {
  if (emailItemSelector.value.length > 0 && itemsContainerSelector[0].children[0].contains(mailP)) {
    itemsContainerSelector[0].children[0].removeChild(mailP);
    itemsContainerSelector[0].classList.remove('red');
  }
});

itemsContainerSelector[1].addEventListener('input', () => {
  if (usernameSelector.value.length > 0
    && itemsContainerSelector[1].children[0].contains(usernameP)) {
    itemsContainerSelector[1].children[0].removeChild(usernameP);
    itemsContainerSelector[1].classList.remove('red');
  }
});

itemsContainerSelector[2].addEventListener('input', () => {
  if ((studentTypeSelector[0].checked || studentTypeSelector[1].checked)
    && itemsContainerSelector[2].children[0].contains(studentTypeP)) {
    itemsContainerSelector[2].children[0].removeChild(studentTypeP);
    itemsContainerSelector[2].classList.remove('red');
  }
});

itemsContainerSelector[3].addEventListener('input', () => {
  if (currentJobSelector.value.length > 0
    && itemsContainerSelector[3].children[0].contains(currentJobP)) {
    itemsContainerSelector[3].children[0].removeChild(currentJobP);
    itemsContainerSelector[3].classList.remove('red');
  }
});

itemsContainerSelector[4].addEventListener('input', () => {
  if (howToKnowSelector.value.length > 0
    && itemsContainerSelector[4].children[0].contains(howToKnowP)) {
    itemsContainerSelector[4].children[0].removeChild(howToKnowP);
    itemsContainerSelector[4].classList.remove('red');
  }
});

itemsContainerSelector[5].addEventListener('input', () => {
  if (CSBackgoundSelector.value.length > 0
    && itemsContainerSelector[5].children[0].contains(CSBackgoundP)) {
    itemsContainerSelector[5].children[0].removeChild(CSBackgoundP);
    itemsContainerSelector[5].classList.remove('red');
  }
});

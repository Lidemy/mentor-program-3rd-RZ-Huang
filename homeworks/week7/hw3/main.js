// 目前只有加法和減法，不能連加與連減。
// 只能用以下步驟加減：輸入數字 → 按 +/- → 輸入數字 → 按 = → 按 AC 重新開始。
// 其他功能（÷、x、.）都會失常。簡單說目前只能通過 README.md 裡面的測試 1 和測試 2。

const h1 = document.querySelector('h1');
let plusChecked = false;
let minusChecked = false;
let frontNumber = '';
let behindNumber = '';
let result = '';

document.querySelector('.button-area').addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && plusChecked !== true && minusChecked !== true) {
    if (h1.innerHTML === '0' && e.target.innerHTML !== '+' && e.target.innerHTML !== '-' && e.target.innerHTML !== 'x' && e.target.innerHTML !== '÷' && e.target.innerHTML !== 'AC' && e.target.innerHTML !== '=') {
      h1.innerHTML = e.target.innerHTML;
      frontNumber = h1.innerHTML;
    } else if (e.target.innerHTML === 'AC') {
      h1.innerHTML = '0';
      frontNumber = '';
      behindNumber = '';
      plusChecked = false;
      minusChecked = false;
    } else if (e.target.innerHTML === '+') {
      plusChecked = true;
      minusChecked = false;
    } else if (e.target.innerHTML === '-') {
      minusChecked = true;
      plusChecked = false;
    } else {
      h1.innerHTML += e.target.innerHTML;
      frontNumber = h1.innerHTML;
    }
  }
});


// 加法
document.querySelector('.button-area').addEventListener('click', (e) => {
  if (plusChecked === true) {
    if (e.target.tagName === 'BUTTON') {
      if (h1.innerHTML === frontNumber && e.target.innerHTML !== '+' && e.target.innerHTML !== '-' && e.target.innerHTML !== 'x' && e.target.innerHTML !== '÷' && e.target.innerHTML !== 'AC' && e.target.innerHTML !== '=') {
        h1.innerHTML = e.target.innerHTML;
        behindNumber = h1.innerHTML;
      } else if (e.target.innerHTML === 'AC') {
        h1.innerHTML = '0';
        frontNumber = '';
        behindNumber = '';
        plusChecked = false;
        minusChecked = false;
      } else if (e.target.innerHTML === '+') {
        plusChecked = true;
        minusChecked = false;
      } else if (e.target.innerHTML === '-') {
        minusChecked = true;
        plusChecked = false;
      } else if (e.target.innerHTML === '=') {
        result = Number(frontNumber) + Number(behindNumber);
        h1.innerHTML = result;
        plusChecked = false;
      } else {
        h1.innerHTML += e.target.innerHTML;
        behindNumber = h1.innerHTML;
      }
    }
  }
});

// 減法
document.querySelector('.button-area').addEventListener('click', (e) => {
  if (minusChecked === true) {
    if (e.target.tagName === 'BUTTON') {
      if (h1.innerHTML === frontNumber && e.target.innerHTML !== '+' && e.target.innerHTML !== '-' && e.target.innerHTML !== 'x' && e.target.innerHTML !== '÷' && e.target.innerHTML !== 'AC' && e.target.innerHTML !== '=') {
        h1.innerHTML = e.target.innerHTML;
        behindNumber = h1.innerHTML;
      } else if (e.target.innerHTML === 'AC') {
        h1.innerHTML = '0';
        frontNumber = '';
        behindNumber = '';
        plusChecked = false;
        minusChecked = false;
      } else if (e.target.innerHTML === '+') {
        plusChecked = true;
        minusChecked = false;
      } else if (e.target.innerHTML === '-') {
        minusChecked = true;
        plusChecked = false;
      } else if (e.target.innerHTML === '=') {
        result = Number(frontNumber) - Number(behindNumber);
        h1.innerHTML = result;
        minusChecked = false;
        behindNumber = frontNumber;
      } else {
        h1.innerHTML += e.target.innerHTML;
        behindNumber = h1.innerHTML;
      }
    }
  }
});

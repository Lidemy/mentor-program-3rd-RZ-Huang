// 隨機變色的秒數大小值設定
const minTime = 1;
const maxTime = 3;

// 有關儲存時間的變數
let startDate;
let endDate;
let error;

// 設定變色的隨機秒數範圍
const settingTime = Math.random() * (maxTime - minTime) * 1000 + minTime * 1000;

// <html> 標籤的選擇器
const htmlSelector = document.querySelector('html');

// 動態新增「再玩一次」按鈕與按鈕的事件監聽
function addButton() {
  // 新增按鈕的 html 結構
  const containerSelector = document.querySelector('.container');
  const newElement = document.createElement('div');
  newElement.classList.add('again');
  newElement.innerHTML = '<button class="again">再玩一次</button>';
  containerSelector.appendChild(newElement);

  // 按鈕的事件監聽
  document.querySelector('.again').addEventListener('click', () => {
    window.location.reload(true); // 按鈕被點的時候重新整理頁面
  });
}

// [變色後】<html> 事件監聽被點擊會發生的事
function countSeconds() {
  endDate = new Date(); // 儲存使用者點擊的當下時間點
  error = (endDate - startDate) / 1000; // 計算第一時間點與第二時間點的秒數差
  alert(`你的成績：${error} 秒`);
  htmlSelector.removeEventListener('click', countSeconds); // 清除 <html> 事件監聽以防二次點擊
  addButton(); // 觸發 addButton() 函式
}

// 【變色後】發生的事
function changeBGColor() {
  htmlSelector.classList.add('BG-color'); // 在 <html> 增加 clas
  startDate = new Date(); // 儲存一變色的時間點
  htmlSelector.addEventListener('click', countSeconds); // 為 <html> 設置點擊的事件監聽
}

// 倒數計時器，時間一到觸發 changBGColor() 函式
const counter = setTimeout(changeBGColor, settingTime);

// 【變色前】誤點會發生的事
function reset() {
  if (!htmlSelector.classList.contains('BG-color')) {
    clearTimeout(counter); // 停止倒數計時器
    alert('手是有多賤？給我重來！');
    addButton(); // 觸發 addButton() 函式
    htmlSelector.removeEventListener('click', reset); // 清除 <html> 事件監聽以防二次點擊
  }
}

// 【變色前】誤點會觸發 reset() 函式
htmlSelector.addEventListener('click', reset);

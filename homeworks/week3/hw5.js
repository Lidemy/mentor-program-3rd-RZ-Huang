function add(a, b) {
  let carry = 0; // 進位儲存用
  const arraySum = []; // 每個位數的加法儲存在這個陣列
  let sum = ''; // 加總結果
  let first = a;
  let second = b;
  // 判定 a 與 b 是否為數字的字串
  // 如果 a 與 b 的位數不同，位數少的補 0
  if (a.length !== b.length) {
    const departure = Math.abs(a.length - b.length);
    if (a.length > b.length) {
      second = '0'.repeat(departure) + b;
    } else {
      first = '0'.repeat(departure) + a;
    }
  }
  const arrayA = first.split(''); // a 字串變陣列
  const arrayB = second.split(''); // b 字串變陣列
  for (let i = first.length - 1; i >= 0; i -= 1) {
    const firstValue = arrayA[i].codePointAt() - 48; // a 每個位數轉成數字
    const secondValue = arrayB[i].codePointAt() - 48; // b 每個位數轉成數字
    let nowValue = firstValue + secondValue; // a 和 b 同位數相加
    // 溢位判斷
    if (nowValue >= 10 || (nowValue === 9 && carry === 1)) {
      nowValue = firstValue + secondValue + carry;
      (nowValue) %= 10;
      arraySum.unshift(nowValue); // 把有進位的這個位數的結果加到陣列，成為第一個元素
      carry = 1; // 進位
      // 溢位到需要再多一個位數時，加 1，其實寫 1 也可以
      if (i === 0) {
        arraySum.unshift(carry);
      }
    } else {
      arraySum.unshift(nowValue + carry); // 把沒進位的這個位數的結果加到陣列，成為第一個元素
      carry = 0; // 因為沒進位所以把 carry 歸零
    }
  }
  sum = arraySum.join(''); // 陣列集合成字串
  return sum;
}
console.log(add('1', '99999'));

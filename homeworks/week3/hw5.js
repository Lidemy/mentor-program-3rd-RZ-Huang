function add(a, b) {
  const arrayA = a.split('');
  const arrayB = b.split('');
  let carry = 0;
  const arraySum = [];
  let sum = '';
  for (let i = a.length - 1; i >= 0; i -= 1) {
    const firstValue = arrayA[i].codePointAt() - 48;
    const secondValue = arrayB[i].codePointAt() - 48;
    let nowValue = firstValue + secondValue;
    console.log(`a ${i}:`, firstValue);
    console.log(`b ${i}:`, secondValue);

    console.log(carry);
    if (nowValue >= 10) {
      (nowValue) %= 10;

      arraySum.unshift(nowValue + carry);
      console.log(arraySum);
      carry = Math.floor((nowValue + 10) / 10);
      if (i === 0 && carry === 1) {
        arraySum.unshift(carry);
      }
    } else {
      arraySum.unshift(nowValue + carry);
      carry = Math.floor((nowValue) / 10);
    }
  }
  sum = arraySum.join('');
  return sum;
}


console.log(add('99', '11'));
module.exports = add;

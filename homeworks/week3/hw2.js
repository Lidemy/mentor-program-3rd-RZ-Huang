function alphaSwap(str) {
  let reverseString = '';
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] >= 'a' && str[i] <= 'z') {
      reverseString += str[i].toUpperCase();
    } else if (str[i] >= 'A' && str[i] <= 'Z') {
      reverseString += str[i].toLowerCase();
    } else {
      reverseString += str[i];
    }
  }
  return reverseString;
}

console.log(alphaSwap('abcd'));

module.exports = alphaSwap;

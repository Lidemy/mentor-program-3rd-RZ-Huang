function isPalindromes(str) {
  let fromHeadString = '';
  let fromTailString = '';
  for (let i = 0; i <= str.length / 2 - 1; i += 1) {
    fromHeadString += str[i];
  }

  for (let j = str.length - 1; j >= str.length / 2; j -= 1) {
    fromTailString += str[j];
  }
  return fromHeadString === fromTailString;
}

console.log(isPalindromes('abcde'));
module.exports = isPalindromes;

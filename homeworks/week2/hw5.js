function join(str, concatStr) {
  let joinString = '';
  for (let i = 0; i < str.length - 1; i += 1) {
    joinString += str[i] + concatStr;
  }
  joinString += str[str.length - 1];
  return joinString;
}

function repeat(str, times) {
  let nTimesString = '';
  for (let i = 1; i <= times; i += 1) {
    nTimesString += str;
  }
  return nTimesString;
}

console.log(join(['a', 1, 'b', 2, 'c', 3], ','));
console.log(repeat('yoyo', 2));

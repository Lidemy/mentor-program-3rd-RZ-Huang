function reverse(str) {
  const stringToArrray = str.split('');
  let reverseString = '';
  for (let i = stringToArrray.length - 1; i >= 0; i -= 1) {
    reverseString += stringToArrray[i];
  }

  console.log(reverseString);
}

reverse('yoyoyo');

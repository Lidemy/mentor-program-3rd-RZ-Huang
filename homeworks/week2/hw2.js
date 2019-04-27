function capitalize(str) {
  const stringToArray = str.split('');
  const headString = stringToArray.splice(0, 1)[0].toUpperCase();
  const arrayToString = stringToArray.join('');
  return headString + arrayToString;
}

console.log(capitalize('hello'));

/* The other solutions

function capitalize(str) {
  const stringToArray = str.split('');
  const headString = stringToArray.splice(0, 1)[0].toUpperCase();
  let arrayToString = '';
  for (const prop of stringToArray) {
    arrayToString += prop;
  }
  return headString + arrayToString;
}

--------------------------------------------
function capitalize(str) {
  const cutString = str.split('');
  const headString = cutString[0].toUpperCase();
  let combineArrayString = '';
  for (let i = 1; i < cutString.length; i++) {
    combineArrayString += cutString[i];
  }
  return headString + combineArrayString;
}

*/

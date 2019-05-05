function stars(n) {
  const array = [];
  if (typeof n === 'number') {
    for (let i = 1; i <= n; i += 1) {
      array.push('*'.repeat(i));
    }
  }
  return array;
}

console.log(stars(5));
module.exports = stars;

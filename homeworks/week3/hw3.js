function isPrime(n) {
  let count = 0;
  for (let i = 1; i < n; i += 1) {
    if (n % i === 0) {
      count += 1;
    }
  }
  return count === 1;
}

console.log(isPrime(1));
module.exports = isPrime;

/**
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
var smallestNumber = function (n, t) {
  const getPord = (n) => {
    let prod = 1;
    while (n) {
      prod *= n % 10;
      n = Math.floor(n / 10);
    }
    return prod;
  };
  while (true) {
    let x = getPord(n);
    console.log(n, x);
    if (x % t == 0) return n;
    n++;
  }
};

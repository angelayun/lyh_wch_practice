/**
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
var smallestNumber = function (n, t) {
  const getProduct = (n) => {
    let prod = 1;
    while (n) {
      prod *= n % 10;
      n = ~~(n / 10);
    }
    return prod;
  };
  while (true) {
    let pd = getProduct(n);
    if (pd % t == 0) return n;
    n++;
  }
};

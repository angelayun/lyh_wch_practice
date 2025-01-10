/**
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @return {number}
 */
var generateKey = function (x, y, z) {
  let prod = 1;
  let ans = 0;
  while (x && y && z) {
    ans += Math.min(x % 10, y % 10, z % 10) * prod;
    prod *= 10;
    x = ~~(x / 10);
    y = ~~(y / 10);
    z = ~~(z / 10);
  }
  return ans;
};

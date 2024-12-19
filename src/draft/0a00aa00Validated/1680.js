/**
 * @param {number} n
 * @return {number}
 */
var concatenatedBinary = function (n) {
  let res = 0n;
  const MOD = BigInt(Math.pow(10, 9) + 7);
  let shift = 0n;
  for (let i = 1n; i <= n; i++) {
    if ((i & (i - 1n)) == 0n) {
      shift++;
    }
    res = ((res << shift) + i) % MOD;
  }
  return Number(res);
};

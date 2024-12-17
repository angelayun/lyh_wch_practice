/**
 * @param {number} n
 * @return {number}
 */
var concatenatedBinary = function (n) {
  let ans = 0n;
  let shift = 0n;
  const MOD = BigInt(Math.pow(10, 9) + 7);
  for (let i = 1n; i <= n; i++) {
    if ((i & (i - 1n)) == 0) shift++;
    ans = ((ans << shift) + i) % MOD;
  }
  return Number(ans);
};

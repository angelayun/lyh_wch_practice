/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfGoodSubsequences = function (nums) {
  const MOD = BigInt(Math.pow(10, 9) + 7);
  let f = new Map();
  let cnt = new Map();
  for (let x of nums) {
    x = BigInt(x);

    let c = (cnt.get(x - 1n) || 0n) + (cnt.get(x + 1n) || 0n) + 1n;
    f.set(
      x,
      ((f.get(x) || 0n) +
        (f.get(x + 1n) || 0n) +
        (f.get(x - 1n) || 0n) +
        x * c) %
        MOD
    );
    cnt.set(x, ((cnt.get(x) || 0n) + c) % MOD);
  }
  let ans = 0n;
  for (let s of f.values()) {
    ans += s;
  }
  return Number(ans % MOD);
};
export default sumOfGoodSubsequences;

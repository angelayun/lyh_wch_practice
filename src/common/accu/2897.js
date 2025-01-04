/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSum = function (nums, k) {
  const MOD = BigInt(1e9 + 7);
  let cnt = new Array(30).fill(0);
  for (let x of nums) {
    for (let i = 0; i < 30; i++) {
      cnt[i] += (x >> i) & 1;
    }
  }
  let ans = 0n;
  while (k-- > 0) {
    let x = 0;
    for (let i = 0; i < 30; i++) {
      if (cnt[i] > 0) {
        cnt[i]--;
        x |= 1 << i;
      }
    }
    ans = (ans + BigInt(x * x)) % MOD;
  }
  return Number(ans);
};

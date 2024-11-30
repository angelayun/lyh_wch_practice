/**
 * @param {number[]} nums
 * @return {number}
 */
var countOfPairs = function (nums) {
  const MOD = Math.pow(10, 9) + 7;
  let n = nums.length;
  let m = Math.max(...nums);
  let f = Array.from({ length: n }, () => new Array(m + 1).fill(0n));
  let s = new Array(m + 1).fill(0n);
  for (let j = 0; j <= nums[0]; j++) {
    f[0][j] = 1;
  }
  for (let i = 1; i < n; i++) {
    s[0] = f[i - 1][0];
    for (let k = 1; k <= m; k++) {
      s[k] = (s[k - 1] + f[i - 1][k]) % MOD;
    }
    for (let j = 0; j <= nums[i]; j++) {
      let maxK = j + Math.min(nums[i - 1] - nums[i], 0);
      f[i][j] = maxK >= 0 ? s[maxK] % MOD : 0;
    }
  }
};
// 写到这里暂时写不下去了

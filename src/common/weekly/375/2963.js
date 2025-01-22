function pow(x, n, mod) {
  x = BigInt(x);
  n = BigInt(n);
  mod = BigInt(mod);
  let res = 1n;
  while (n) {
    if (n % 2n) {
      res = (res * x) % mod;
    }
    x = (x * x) % mod;
    n = n >> 1n;
  }
  return res;
}
/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfGoodPartitions = function (nums) {
  let rightPosition = {};
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    rightPosition[nums[i]] = i;
  }
  let m = 0;
  let maxRight = 0;
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    maxRight = Math.max(maxRight, rightPosition[x]);
    if (maxRight == i) {
      m++;
    }
  }
  return Number(pow(2, m - 1, 1e9 + 7));
};

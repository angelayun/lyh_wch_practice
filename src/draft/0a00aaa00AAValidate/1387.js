/**
 * @param {number} lo
 * @param {number} hi
 * @param {number} k
 * @return {number}
 */
var getKth = function (lo, hi, k) {
  let memo = new Map();
  const dfs = (x) => {
    if (x == 1) return 0;
    if (memo.has(x)) {
      return memo.get(x);
    }
    let res;
    if (x & 1) {
      // 是奇数
      res = dfs((3 * x + 1) / 2) + 2;
    } else {
      // 是偶数
      res = dfs(x / 2) + 1;
    }
    memo.set(x, res);
    return res;
  };
  let nums = Array.from({ length: hi - lo + 1 }, (_, i) => i + lo);
  nums.sort((a, b) => {
    return dfs(a) - dfs(b) || a - b;
  });
  return nums[k - 1];
};

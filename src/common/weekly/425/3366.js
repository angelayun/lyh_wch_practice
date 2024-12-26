/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} op1
 * @param {number} op2
 * @return {number}
 */
var minArraySum = function (nums, k, op1, op2) {
  const n = nums.length;
  let memo = Array.from({ length: n }, () =>
    Array.from({ length: op1 + 1 }, () => new Array(op2 + 1).fill(-1))
  );
  const dfs = (i, op1, op2) => {
    if (i < 0) return 0;
    if (memo[i][op1][op2] != -1) return memo[i][op1][op2];
    let x = nums[i];
    let res = dfs(i - 1, op1, op2) + x;
    if (op1 > 0) {
      res = Math.min(res, dfs(i - 1, op1 - 1, op2) + ~~((x + 1) / 2));
    }
    if (op2 > 0 && x >= k) {
      res = Math.min(res, dfs(i - 1, op1, op2 - 1) + x - k);
      if (op1 > 0) {
        let y =
          ~~((x + 1) / 2) >= k ? ~~((x + 1) / 2) - k : ~~((x - k + 1) / 2);
        res = Math.min(res, dfs(i - 1, op1 - 1, op2 - 1) + y);
      }
    }
    return (memo[i][op1][op2] = res);
  };
  return dfs(n - 1, op1, op2);
};

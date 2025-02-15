/**
 * @param {number} k
 * @return {number}
 */
var minOperations = function (k) {
  // 设若干次+1操作后，最大值为m 此时数组中只有一个数m
  // m*x>=k
  // x= ceil(k/m)
  // 总的操作次数为 m-1 + x-1
  // m最小是1最大是k
  let ans = Number.MAX_SAFE_INTEGER;
  for (let m = 1; m <= k; m++) {
    ans = Math.min(ans, m - 1 + Math.ceil(k / m) - 1);
  }
  return ans;
};

/**
 * @param {number} k
 * @return {number}
 */
var minOperations = function (k) {
  // 设若干次+1操作后，最大值为m 此时数组中只有一个数m
  // m*x>=k
  // x= ceil(k/m)
  // 总的操作次数为 m-1 + x-1
  // m最小是1最大是k
  let rt = Math.max(Math.sqrt(k - 1), 1);
  return Math.min(
    rt - 1 + Math.ceil(k / rt) - 1,
    rt - 1 - 1 + Math.ceil(k / (rt - 1)) - 1
  );
};

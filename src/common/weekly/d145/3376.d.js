/**
 * @param {number[]} strength
 * @param {number} k
 * @return {number}
 */
var findMinimumTime = function (strength, k) {
  const n = strength.length;
  let vis = new Array(n).fill(false);
  let ans = Number.MAX_SAFE_INTEGER;
  const dfs = (i, time) => {
    if (time > ans) return;
    if (i == n) {
      ans = Math.min(ans, time);
      return;
    }
    let x = 1 + i * k;
    for (let j = 0; j < n; j++) {
      if (!vis[j]) {
        vis[j] = true;
        dfs(i + 1, time + Math.ceil(strength[j] / x));
        vis[j] = false;
      }
    }
  };
  dfs(0, 0);
  return ans;
};

/**
 * @param {number[]} strength
 * @param {number} k
 * @return {number}
 */
var findMinimumTime = function (strength, k) {
  const n = strength.length;
  let vis = new Array(n).fill(false);
  let ans = Number.MAX_SAFE_INTEGER;
  const dfs = (i, time) => {
    if (time > ans) return;
    if (i == n) {
      ans = Math.min(ans, time);
      return;
    }
    let x = 1 + i * k;
    for (let j = 0; j < n; j++) {
      if (!vis[j]) {
        vis[j] = true;
        // dfs(i + 1, time + Math.ceil(strength[j] / x));

        dfs(i + 1, time + ~~((strength[j] - 1) / x) + 1);
        vis[j] = false;
      }
    }
  };
  dfs(0, 0);
  return ans;
};
/**
 * @param {number[]} strength
 * @param {number} k
 * @return {number}
 */
var findMinimumTime = function (strength, k) {
  const n = strength.length;

  var hammingWeight = function (n) {
    let count = 0;
    while (n) {
      n &= n - 1;
      count++;
    }
    return count;
  };
  let memo = new Array(1 << n).fill(-1);
  const dfs = (i) => {
    // i位上是1的表示还没有开  是0的表示已经开过了
    if (i == 0) return 0;
    if (memo[i] != -1) return memo[i];
    let x = 1 + (n - hammingWeight(i)) * k;
    let res = Infinity;
    for (let j = 0; j < n; j++) {
      let s = strength[j];
      if ((i >> j) & 1) {
        let r = dfs(i ^ (1 << j)) + Math.ceil(strength[j] / x);
        res = Math.min(res, r);
      }
    }
    return (memo[i] = res);
  };
  return dfs((1 << n) - 1);
};

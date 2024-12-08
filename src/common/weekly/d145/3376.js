/**
 * @param {number[]} strength
 * @param {number} K
 * @return {number}
 */
var findMinimumTime = function (strength, k) {
  const n = strength.length;
  let done = new Array(n).fill(false);
  let ans = Number.MAX_SAFE_INTEGER;
  const dfs = (i, time) => {
    if (time >= ans) return;
    if (i == n) {
      ans = time;
      return;
    }
    let x = 1 + k * i;
    for (let j = 0; j < n; j++) {
      if (!done[j]) {
        done[j] = true;
        dfs(i + 1, time + ~~((strength[j] - 1) / x) + 1);
        done[j] = false;
      }
    }
  };
  dfs(0, 0);
  console.log(ans);
  return ans;
};

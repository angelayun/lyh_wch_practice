/**
 * @param {number[]} nums
 * @param {number[]} removeQueries
 * @return {number[]}
 */
var maximumSegmentSum = function (nums, removeQueries) {
  // 把x合并到x+1 (x指的是下标)
  const n = nums.length;
  let fa = Array.from({ length: n + 1 }, (v, k) => k);
  let s = new Array(n + 1).fill(0);
  let find = (x) => {
    if (fa[x] != x) {
      fa[x] = find(fa[x]);
    }
    return fa[x];
  };
  let ans = new Array(n).fill(0);
  for (let i = n - 1; i > 0; i--) {
    let x = removeQueries[i];
    let to = find(x + 1);
    fa[x] = to; // 合并x和x+1
    s[to] += s[x] + nums[x];
    ans[i - 1] = Math.max(ans[i], s[to]);
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var sumImbalanceNumbers = function (nums) {
  let ans = 0;
  let n = nums.length;
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    let vis = Array.from({ length: n + 2 }, () => false);
    vis[x] = true;
    let cnt = 0;
    for (let j = i + 1; j < n; j++) {
      let x = nums[j];
      if (!vis[x]) {
        cnt += 1 - vis[x - 1] - vis[x + 2];
        vis[x] = true;
      }
      ans += cnt;
    }
  }
  return ans;
};

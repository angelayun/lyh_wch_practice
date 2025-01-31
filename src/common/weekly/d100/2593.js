/**
 * @param {number[]} nums
 * @return {number}
 */
var findScore = function (nums) {
  const n = nums.length;
  let ids = Array.from({ length: n }, (v, i) => i);
  ids.sort((a, b) => nums[a] - nums[b]);
  let ans = 0n;
  let vis = new Array(n + 2).fill(false);
  for (let i of ids) {
    if (!vis[i + 1]) {
      vis[i] = vis[i + 2] = true;
      ans += BigInt(nums[i]);
    }
  }
  return Number(ans);
};

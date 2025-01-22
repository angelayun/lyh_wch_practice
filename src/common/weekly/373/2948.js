/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function (nums, limit) {
  const n = nums.length;
  let ids = Array.from({ length: n }, (v, k) => k);
  ids.sort((a, b) => nums[a] - nums[b]);
  let ans = new Array(n).fill(0);
  for (let i = 0; i < n; ) {
    let start = i;
    for (i++; i < n && nums[ids[i]] - nums[ids[i - 1]] <= limit; i++);
    let subIds = ids.slice(start, i);
    subIds.sort((a, b) => a - b);
    for (let j = 0; j < subIds.length; j++) {
      ans[subIds[j]] = nums[ids[start + j]];
    }
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function (nums, k) {
  let ans = Number.MAX_SAFE_INTEGER;
  // key是Or的值  value是对应的子数组左端点的最大值
  let map = new Map();
  // 枚举右端点
  for (let [right, x] of nums.entries()) {
    let newMap = new Map();
    for (let [or_, left] of map.entries()) {
      newMap.set(or_ | x, left);
    }
    newMap.set(x, right);
    for (let [or_, left] of newMap.entries()) {
      if (or_ >= k) {
        ans = Math.min(ans, right - left + 1);
      }
    }
    map = newMap;
  }
  return ans < Number.MAX_SAFE_INTEGER ? ans : -1;
};
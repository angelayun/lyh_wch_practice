// 返回大于target值的最小索引
const lowerBound = (nums, target) => {
  const n = nums.length;
  let left = 0,
    right = n - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    // 这里是<=
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};
/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var answerQueries = function (nums, queries) {
  // 这里的sort里面的函数不能简写掉 或者说不能省略掉
  nums.sort((a, b) => a - b);
  // 求子序列的和 所以就可以排序
  for (let i = 1; i < nums.length; i++) {
    // 直接原地求前缀和
    nums[i] += nums[i - 1];
  }
  let res = [];
  for (let target of queries) {
    res.push(lowerBound(nums, target));
  }
  return res;
};

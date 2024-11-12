// 返回大于等于target值的最小索引
const lowerBound = (nums, target) => {
  const n = nums.length;
  let left = 0,
    right = n - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumCount = function (nums) {
  const negCount = lowerBound(nums, 0);
  const posCount = lowerBound(nums, 0 + 1) - 1;
  console.log(negCount, posCount);
  return negCount;
};

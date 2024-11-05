const lowerBound = (nums, right, target) => {
  let left = 0;
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
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  nums.sort((a, b) => a - b);
  let count = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    // nums[j]的范围是 [lower-nums[i],upper-nums[i]]
    let leftIndex = lowerBound(nums, i - 1, lower - nums[i]);
    let rightIndex = lowerBound(nums, i - 1, upper - nums[i] + 1);
    count += rightIndex - leftIndex;
  }
  return count;
};

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  nums.sort((a, b) => a - b);
  let count = 0;
  const n = nums.length;
  let left = n,
    right = n;
  for (let i = 0; i < n; i++) {
    // 保证right>0 所以right-1最小值为0  这里比较的是right-1的位置  所以right循环结束之后正好指向了=upper - nums[i]的值的地方
    while (right > 0 && nums[right - 1] > upper - nums[i]) {
      right--;
    }
    // 循环结束之后  left指向lower - nums[i]左边界的前一个位置
    while (left > 0 && nums[left - 1] >= lower - nums[i]) {
      left--;
    }
    // i是右边界  [left,right]是左边界 
    count += Math.min(right, i) - Math.min(left, i);
  }
  return count;
};

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  let ans = 0;
  nums.sort((a, b) => a - b);
  // 要求的范围是[lower-nums[j],upper-nums[j]]
  const n = nums.length;
  const lowerBound = (right, target) => {
    // 写开区间
    let left = -1; // 开区间(left,right)
    while (left + 1 < right) {
      // 循环不变量：
      // nums[left] < target
      // nums[right] >= target
      let mid = left + ((right - left) >> 1);
      if (nums[mid] < target) {
        left = mid;
      } else {
        right = mid;
      }
    }
    return right;
  };
  for (let j = 0; j < n; j++) {
    let right = lowerBound(j, upper - nums[j] + 1); //<= upper-nums[j] 的 nums[i] 的个数
    let left = lowerBound(j, lower - nums[j]); // < lower-nums[j] 的 nums[i] 的个数
    ans += right - left;
  }
  return ans;
};



// 下面是第二种三指针的方式
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  let ans = 0;
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let left = n,
    right = n;
  for (let j = 0; j < n; j++) {
    let x = nums[j];
    while (right && nums[right - 1] > upper - x) {
      right--;
    }
    // right刚好指向<=upper - x的位置
    while (left && nums[left - 1] >= lower - x) left--;
    // left刚好指向小于lower - x的位置
    ans += Math.min(right, j) - Math.min(left, j);
  }
  return ans;
};
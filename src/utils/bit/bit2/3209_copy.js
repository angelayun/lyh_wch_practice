/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  /* const lowerBound = (nums, target, searchLeft, searchRight) => {
    let left = searchLeft,
      right = searchRight;
    while (left <= right) {
      let mid = left + ((right - left) >> 1);
      if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return left;
  }; */
  let ans = 0;
  let left = 0,
    right = 0;
  for (let [i, x] of nums.entries()) {
    for (let j = i - 1; j >= 0; j--) {
      if ((nums[j] & x) == nums[j]) break;
      nums[j] &= x;
    }
    /* // 对于[0,i]中的j,nums[j]等于nums[j]~nums[i]的AND
    // 从nums[0] 到nums[i] 相邻元素左边<=右边  非降数组
    // 可以直接二分 k 的第一个位置 left 和 最后一个位置 right - 1
    let left = lowerBound(nums, k, 0, i);
    let right = lowerBound(nums, k + 1, 0, i);
    // [left,right)  左闭右开 */

    // 由于nums[j] 保存的是nums[j]~nums[i] 的AND
    // 那么随着i的变大，nums[j]变小 有单调性
    while (left <= i && nums[left] < k) left++;
    // 循环结束后， nums[left]>=k
    while (right <= i && nums[right] <= k) right++;
    // 循环结束后，nums[right]>k
    ans += right - left;
  }
  return ans;
};
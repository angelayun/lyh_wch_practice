/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function (nums, k) {
  nums.sort((a, b) => a - b);
  // 怎么着  窗口里面的数据也有1
  let ans = 1;
  let operCount = 0;
  const n = nums.length;
  for (let left = 0, right = 1; right < n; right++) {
    // 把窗口内 所有数都变成nums[right] 需要改变的个数是(right - left) 每一次都是一步一步增加的  增量为nums[right] - nums[right - 1]
    operCount += (right - left) * (nums[right] - nums[right - 1]);
    while (operCount > k) {
      // 把左侧元素移除  之前多加了nums[right]-nums[left]次
      operCount -= nums[right] - nums[left++];
    }
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};

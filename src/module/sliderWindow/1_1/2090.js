/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var getAverages = function (nums, k) {
  const n = nums.length;
  let res = new Array(n).fill(-1);
  let winSum = 0;
  for (let left = 0, right = 0; right < n; right++) {
    winSum += nums[right];
    while (right - left + 1 > 2 * k + 1) {
      winSum -= nums[left++];
    }
    if (right >= 2 * k) {
      res[right - k] = ~~(winSum / (2 * k + 1));
    }
  }
  return res;
};

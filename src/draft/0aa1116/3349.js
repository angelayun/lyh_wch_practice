/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var hasIncreasingSubarrays = function (nums, k) {
  const n = nums.length;
  for (let i = 0; i <= n - 2 * k; i++) {
    // i是第一个数组的起点
    let j = i + k;
    console.log(i, j);
    let flag = true;
    // j是第2个数组的起点
    for (let a = 0; a < k - 1; a++) {
      console.log(nums[i + a], nums[i + a + 1], nums[i + a] >= nums[i + a + 1]);
      if (nums[i + a] >= nums[i + a + 1]) {
        flag = false;
        break;
      }
      console.log(nums[j + a], nums[j + a + 1], nums[j + a] >= nums[j + a + 1]);

      if (nums[j + a] >= nums[j + a + 1]) {
        flag = false;
        break;
      }
    }
    if (flag) return true;
  }
  return false;
};
// export default hasIncreasingSubarrays;

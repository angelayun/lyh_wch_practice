/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const n = nums.length;
  let maxVal = Math.max(...nums);
  let cnt = 0;
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    let x = nums[right];
    if (x == maxVal) {
      cnt++;
    }
    while (cnt == k) {
      let y = nums[left];
      if (y == maxVal) {
        cnt--;
      }
      left++;
    }
    // console.log(left, right)
    // 缩短为刚好为k次，以右端点为子数组的右端点  左端点前面的数字就都是满足条件的
    ans += left;
  }
  return ans;
};

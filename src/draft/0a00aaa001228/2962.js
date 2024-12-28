/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const n = nums.length;
  let count = 0;
  let ans = 0;
  let maxVal = Math.max(...nums);
  for (let left = 0, right = 0; right < n; right++) {
    let x = nums[right];
    if (x == maxVal) {
      count++;
    }
    // 第一眼没有想明白在哪个点收缩
    while (count >= k) {
      console.log(n, right);
      if (nums[left] == maxVal) {
        count--;
      }
      left++;
    }
    ans += left;
  }
  return ans;
};

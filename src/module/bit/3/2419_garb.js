/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
  let maxVal = nums[0];
  let maxLen = 1;
  const n = nums.length;

  for (let left = 0; left < n; left++) {
    let and = nums[left];
    if (and < maxVal) {
      maxVal = and;
      maxLen = 1;
    }
    for (
      let right = left + 1;
      (and & nums[right]) == and && right < n;
      right++
    ) {
      and &= nums[right];
      console.log(and, maxVal, left, right);
      if (and == maxVal && right - left + 1 > maxLen) {
        maxLen = right - left + 1;
      }
    }
  }
  return maxLen;
};
// 这个写的有点乱  通不过
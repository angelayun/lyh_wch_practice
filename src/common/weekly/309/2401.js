/**
 * @param {number[]} nums
 * @return {number}
 */
var longestNiceSubarray = function (nums) {
  const n = nums.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    let or = nums[i];
    let j = i - 1;
    for (; j >= 0 && (or & nums[j]) == 0; j--) {
      or |= nums[j];
    }
    // 一般情况下 闭区间是i-j+1  但是这里j多减少了一次
    ans = Math.max(ans, i - j);
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestNiceSubarray = function (nums) {
  const n = nums.length;
  let ans = 0;
  let or = 0;
  for (let left = 0, right = 0; right < n; right++) {
    let x = nums[right];
    while (or & x) {
      or ^= nums[left++];
    }
    or |= x;
    ans = Math.max(right - left + 1, ans);
  }
  return ans;
};

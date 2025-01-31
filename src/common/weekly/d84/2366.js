/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumReplacement = function (nums) {
  let ans = 0;
  const n = nums.length;
  let m = nums[n - 1];
  for (let i = n - 1; i >= 0; i--) {
    let num = nums[i];
    let k = Math.floor((num - 1) / m);
    ans += k;
    m = Math.floor(num / (k + 1));
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumOr = function (nums, k) {
  k = BigInt(k);
  const n = nums.length;
  let suffix = new Array(n + 1).fill(0n);
  for (let i = n - 1; i >= 1; i--) {
    suffix[i] = suffix[i + 1] | BigInt(nums[i]);
  }
  let pre = 0n;
  let ans = 0n;
  for (let i = 0; i < n; i++) {
    let x = nums[i] << k;
    let curVal = pre | x | suffix[i + 1];
    if (ans < curVal) {
      ans = curVal;
    }
    pre |= nums[i];
  }
  return ans;
};

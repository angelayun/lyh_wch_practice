/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumOr = function (nums, k) {
  const n = nums.length;
  k = BigInt(k);
  let suffix = Array.from({ length: n + 1 }, () => 0n);
  for (let i = n - 1; i >= 0; i--) {
    nums[i] = BigInt(nums[i]);
    suffix[i] = suffix[i + 1] | nums[i];
  }
  let pre = 0n;
  let maxVal = 0n;
  for (let i = 0; i < n; i++) {
    let x = nums[i] << k;
    let cur = pre | x | suffix[i + 1];
    if (cur > maxVal) {
      maxVal = cur;
    }
    pre |= nums[i];
  }
  return Number(maxVal);
};

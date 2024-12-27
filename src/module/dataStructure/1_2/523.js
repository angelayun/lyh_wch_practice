/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  const n = nums.length;
  if (n < 2) return false;
  //  preSum的值  对应的索引位置
  let cnt = new Map([[0, -1]]);
  let preSum = 0;
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    preSum += x;
    // let key = ((preSum % k) + k) % k;
    let key = preSum % k;
    if (cnt.has(key)) {
      if (i - cnt.get(key) >= 2) return true;
    } else {
      cnt.set(key, i);
    }
  }
  return false;
};

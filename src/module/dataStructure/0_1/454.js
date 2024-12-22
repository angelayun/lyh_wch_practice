/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  let cnt = new Map();
  let res = 0;
  // 先把num1和num2中所有二数之和存到cnt当中
  const n = nums1.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = nums1[i] + nums2[j];
      cnt.set(sum, (cnt.get(sum) || 0) + 1);
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = nums3[i] + nums4[j];
      let target = -sum;
      if (cnt.has(target)) {
        res += cnt.get(target);
      }
    }
  }
  return res;
};

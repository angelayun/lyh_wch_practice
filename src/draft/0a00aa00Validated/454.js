/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  let res = 0;
  let cnt = new Map();
  for (let x of nums1) {
    for (let y of nums2) {
      cnt.set(x + y, (cnt.get(x + y) || 0) + 1);
    }
  }
  for (let x of nums3) {
    for (let y of nums4) {
      let target = x + y;
      if (cnt.has(-target)) {
        res += cnt.get(-target);
      }
    }
  }
  return res;
};

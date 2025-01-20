/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minimumAddedInteger = function (nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  for (let i = 2; i >= 0; i--) {
    let diff = nums2[0] - nums1[i];
    let j = 0;
    for (let k = i; k < nums1.length; k++) {
      if (nums1[k] + diff == nums2[j]) {
        j++;
      }
      if (j == nums2.length) return diff;
    }
  }
};

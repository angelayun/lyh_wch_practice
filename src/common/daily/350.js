/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  let i = 0,
    j = 0;
  let res = [];
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) i++;
    else if (nums2[j] < nums1[i]) j++;
    else {
      res.push(nums1[i]);
      i++;
      j++;
    }
  }
  return res;
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  let cnt = new Map();
  for (let x of nums1) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  let res = [];
  for (let x of nums2) {
    if (cnt.has(x)) {
      res.push(x);
      cnt.set(x, cnt.get(x) - 1);
      if (cnt.get(x) == 0) cnt.delete(x);
    }
  }
  return res;
};

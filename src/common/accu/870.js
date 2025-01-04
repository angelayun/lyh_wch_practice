/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var advantageCount = function (nums1, nums2) {
  nums1.sort((a, b) => a - b);
  const n = nums2.length;
  let ids = Array.from({ length: n }, (_, i) => i);
  ids.sort((a, b) => nums2[a] - nums2[b]);
  let left = 0,
    right = n - 1;
  let ans = new Array(n).fill(0);
  for (let x of nums1) {
    ans[x > nums2[ids[left]] ? ids[left++] : ids[right--]] = x;
  }
  return ans;
};

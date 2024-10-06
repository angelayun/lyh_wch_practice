/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const n = nums1.length, m = nums2.length
  let res = new Array(n).fill(-1)
  let cnt = new Map()
  let stack = []
  for (let i = m - 1; i >= 0; i--) {
    while (stack.length && nums2[stack[stack.length - 1]] <= nums2[i]) {
      stack.pop()
    }
    if (stack.length) {
      cnt.set(nums2[i], nums2[stack[stack.length - 1]])
    }
    stack.push(i)
  }
  for (let i = 0; i < n; i++) {
    if (cnt.has(nums1[i])) {
      res[i] = cnt.get(nums1[i])
    }
  }
  return res;
};
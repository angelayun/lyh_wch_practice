/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const n = nums1.length, m = nums2.length
  let cnt = new Map()
  for (let i = 0; i < nums1.length; i++) {
    cnt.set(nums1[i], i)
  }
  let res = new Array(n).fill(-1)
  let stack = []
  for (let i = 0; i < m; i++) {
    while (stack.length && nums2[stack[stack.length - 1]] < nums2[i]) {
      let index = stack.pop()
      if (cnt.has(nums2[index])) {
        res[cnt.get(nums2[index])] = nums2[i]
      }
    }
    stack.push(i)
  }
  return res
};
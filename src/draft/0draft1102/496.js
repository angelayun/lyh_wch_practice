/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const n = nums1.length;
  let ans = new Array(n).fill(-1);
  let cnt = new Map();
  for (let i = 0; i < n; i++) {
    cnt.set(nums1[i], i);
  }
  let stack = [];
  for (let j = 0; j < nums2.length; j++) {
    while (stack.length && nums2[stack[stack.length - 1]] < nums2[j]) {
      let i = stack.pop();
      let val = nums2[i];
      if (cnt.has(val)) {
        ans[cnt.get(val)] = nums2[j];
      }
    }
    stack.push(j);
  }
  return ans;
};

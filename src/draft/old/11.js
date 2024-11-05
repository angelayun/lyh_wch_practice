/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let res = 0
  const n = height.length
  let left = 0, right = height[n - 1]
  while (left < right) {
    res = Math.max(res, (right - left) * Math.min(height[left], height[right]))
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return res
};
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let res = 0
  const n = height.length
  let left = 0, right = n - 1;
  while (left < right) {
    let area = (right - left) * Math.min(height[left], height[right])
    res = Math.max(area, res)
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return res;
};
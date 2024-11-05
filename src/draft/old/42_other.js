/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length
  let ans = 0
  let stack = []
  for (let i = 0; i < height.length; i++) {
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      let bottomH = height[stack.pop()]
      if (stack.length == 0) break
      let left = stack[stack.length - 1]
      let dh = Math.min(height[left], height[i]) - bottomH
      ans += dh * (i - left - 1)
    }
    stack.push(i)
  }
  return ans
};
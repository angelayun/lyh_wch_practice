/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length
  // 先写前后缀分解的方式
  /* let suffixMax = new Array(n).fill(0)
  suffixMax[n - 1] = height[n - 1]
  for (let i = n - 2; i >= 0; i--) {
    suffixMax[i] = Math.max(suffixMax[i + 1], height[i])
  }
  let prefixMax = new Array(n).fill(0)
  prefixMax[0] = height[0]
  for (let i = 1; i < n; i++) {
    prefixMax[i] = Math.max(prefixMax[i - 1], height[i])
  }
  let ans = 0
  for (let i = 0; i < n; i++) {
    ans += Math.min(prefixMax[i], suffixMax[i]) - height[i]
  } */
  let ans = 0
  let suffixMax = 0, prefixMax = 0
  let left = 0, right = n - 1
  while (left <= right) {
    suffixMax = Math.max(suffixMax, height[right])
    prefixMax = Math.max(prefixMax, height[left])
    if (prefixMax < suffixMax) {
      ans += prefixMax - height[left++]
    } else {
      ans += suffixMax - height[right--]
    }
  }
  return ans
};

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length
  let stack = []
  let ans = 0
  for (let i = 0; i < n; i++) {
    while (stack.length && height[i] >= height[stack[stack.length - 1]]) {
      let bottomH = height[stack.pop()]
      if (stack.length == 0) break
      let left = stack[stack.length - 1]
      let h = Math.min(height[i], height[left]) - bottomH
      ans += h * (i - left + 1)
    }
    stack.push(i)
  }
  return ans
};
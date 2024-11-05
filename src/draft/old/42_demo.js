// 前后缀分解
var trap = function (height) {
  const n = height.length
  let prefixMax = new Array(n).fill(0)
  prefixMax[0] = height[0]
  for (let i = 1; i < n; i++) {
    prefixMax[i] = Math.max(prefixMax[i - 1], height[i])
  }
  let suffixMax = new Array(n).fill(0)
  suffixMax[n - 1] = height[n - 1]
  for (let j = n - 2; j >= 0; j--) {
    suffixMax[j] = Math.max(suffixMax[j + 1], height[j])
  }
  let ans = 0
  for (let i = 0; i < n; i++) {
    ans += Math.min(suffixMax[i], prefixMax[i]) - height[i]
  }
  return ans
};

// 双指针写法
var trap = function (height) {
  const n = height.length
  let prefixMax = 0, suffixMax = 0
  let ans = 0
  let left = 0, right = n - 1
  while (left <= right) {
    prefixMax = Math.max(prefixMax, height[left])
    suffixMax = Math.max(suffixMax, height[right])
    if (prefixMax < suffixMax) {
      ans += prefixMax - height[left]
      left++
    } else {
      ans += suffixMax - height[right]
      right--
    }
  }
  return ans
};
// 这两种方式都过了
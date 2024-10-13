/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length
  let suffixMax = new Array(n)
  suffixMax[n - 1] = height[n - 1]
  for (let i = n - 2; i >= 0; i--) {
    suffixMax[i] = Math.max(suffixMax[i + 1], height[i])
  }
  let prefixMax = 0
  let ans = 0
  for (let i = 0; i < n; i++) {
    let cur = height[i]
    ans += Math.max(0, Math.min(prefixMax, suffixMax[i + 1] || 0) - cur)
    console.log(ans)
    prefixMax = Math.max(prefixMax, cur)
  }
  console.log(ans)
  // return 0

  return ans
};
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length
  let suffixMax = new Array(n)
  suffixMax[n - 1] = height[n - 1]
  for (let i = n - 2; i >= 0; i--) {
    suffixMax[i] = Math.max(suffixMax[i + 1], height[i])
  }
  let prefixMax = 0
  let ans = 0
  for (let i = 0; i < n; i++) {
    let cur = height[i]
    prefixMax = Math.max(prefixMax, cur)
    // 这个是写在求ans之前的
    ans += Math.min(prefixMax, suffixMax[i]) - cur
    console.log(ans)
  }
  console.log(ans)
  // return 0

  return ans
};
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length
  let suffixMax = Number.MIN_SAFE_INTEGER, prefixMax = Number.MIN_SAFE_INTEGER
  let ans = 0
  let left = 0, right = n - 1;
  while (left <= right) {
    suffixMax = Math.max(suffixMax, height[right])
    prefixMax = Math.max(prefixMax, height[left])
    if (prefixMax < suffixMax) {
      ans += Math.min(suffixMax, prefixMax) - height[left]
      left++
    } else {
      ans += Math.min(suffixMax, prefixMax) - height[right]

      right--
    }
  }
  return ans
};

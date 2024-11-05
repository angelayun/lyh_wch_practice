/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const n = nums.length
  let memo = new Array(n).fill(-1)
  // dfs(i) 表示以 nums[i] 结尾的最长递增子序列（LIS）的长度。
  const dfs = (i) => {
    if (memo[i] != -1) return memo[i]
    let res = 0
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        res = Math.max(res, dfs(j))
      }
    }
    return memo[i] = res + 1
  }
  let ans = 0
  for (let i = 0; i < n; i++) {
    ans = Math.max(ans, dfs(i))
  }
  return ans

};


/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const n = nums.length
  // f[i] 表示以 nums[i] 结尾的最长递增子序列（LIS）的长度。
  let dp = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j])
      }
    }
    dp[i] += 1
  }
  return Math.max(...dp)
};
const lowerBound = (nums, target) => {
  // 左闭右闭区间
  const n = nums.length;
  let left = 0, right = n - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
}
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let g = []
  for (let x of nums) {
    let j = lowerBound(g, x)
    if (j == g.length) {
      g.push(x)
    } else {
      g[j] = x
    }
  }
  return g.length
};

const lowerBound1 = (nums, target, right) => {
  let left = -1; // 开区间 (left, right)
  while (left + 1 < right) { // 区间不为空
    // 循环不变量：
    // nums[left] < target
    // nums[right] >= target
    let mid = left + (right - left) / 2;
    if (nums[mid] < target) {
      left = mid; // 范围缩小到 (mid, right)
    } else {
      right = mid; // 范围缩小到 (left, mid)
    }
  }
  return right; // 或者 left+1
}
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {

  let ng = 0
  for (let x of nums) {
    let j = lowerBound1(nums, x, ng)
    nums[j] = x
    if (j == ng) ng++
  }
  return ng
};
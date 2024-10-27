

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const n = nums.length
  let count = 0
  let ans = 0
  let maxVal = Math.max(...nums)
  for (let left = 0, right = 0; right < n; right++) {
    let x = nums[right]
    if (x == maxVal) {
      count++
    }
    // 第一眼没有想明白在哪个点收缩 
    while (count == k) {
      if (nums[left] == maxVal) {
        count--
      }
      left++
    }
    // 示例 1，nums = [1,3,2,3,3], k = 2 
    // 当右端点移到第二个 3 时，左端点移到 2，此时[1, 3, 2, 3] 和[3, 2, 3] 是满足要求的。
    // 当右端点移到第三个 3 时，左端点也移到第三个 3，此时[1, 3, 2, 3, 3], [3, 2, 3, 3], [2, 3, 3], [3, 3] 都是满足要求的。所以答案为 2 + 4=6。

    ans += left

  }
  return ans
};



/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const n = nums.length
  let count = 0
  let ans = 0
  let maxVal = Math.max(...nums)
  for (let left = 0, right = 0; right < n; right++) {
    let x = nums[right]
    if (x == maxVal) {
      count++
    }
    // 第一眼没有想明白在哪个点收缩 
    while (count >= k) {
      ans += n - right
      if (nums[left] == maxVal) {
        count--
      }
      left++
    }
    // 示例 1，nums = [1,3,2,3,3], k = 2 
    // 当右端点移到第二个 3 时，左端点移到 2，此时[1, 3, 2, 3] 和[3, 2, 3] 是满足要求的。
    // 当右端点移到第三个 3 时，左端点也移到第三个 3，此时[1, 3, 2, 3, 3], [3, 2, 3, 3], [2, 3, 3], [3, 3] 都是满足要求的。所以答案为 2 + 4=6。
    // ans += left

  }
  return ans
};
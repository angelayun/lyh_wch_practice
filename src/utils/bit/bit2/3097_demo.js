/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function (nums, k) {
  let ans = Number.MAX_SAFE_INTEGER
  const n = nums.length
  let cnt = new Map()
  for (let right = 0; right < n; right++) {
    let x = nums[right]
    let newMap = new Map([[x, right]])
    for (let [or, left] of cnt.entries()) {
      newMap.set((or | x), left)
    }
    for (let [or, left] of newMap.entries()) {
      if (or >= k) {
        ans = Math.min(ans, right - left + 1)
      }
    }
    cnt = newMap
  }
  return ans == Number.MAX_SAFE_INTEGER ? -1 : ans
};
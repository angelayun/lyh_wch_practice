/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function (nums, k) {
  const n = nums.length;
  let ans = Number.MAX_SAFE_INTEGER
  let cnt = new Map()
  for (let right = 0; right < n; right++) {
    let x = nums[right]
    let newCnt = new Map()
    // 循环上一轮的值
    for (let [or, left] of cnt.entries()) {
      newCnt.set(or | x, left)
    }
    newCnt.set(x, right)
    for (let [or, left] of newCnt.entries()) {
      if (or >= k) {
        ans = Math.min(ans, right - left + 1)
      }
    }
    cnt = newCnt
  }
  return ans == Number.MAX_SAFE_INTEGER ? -1 : ans
};
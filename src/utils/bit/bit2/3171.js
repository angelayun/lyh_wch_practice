/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  let ans = Number.MAX_SAFE_INTEGER
  const n = nums.length
  for (let right = 0; right < n; right++) {
    ans = Math.min(ans, Math.abs(nums[right] - k))
    for (let left = right; left >= 0; left--) {
      if (nums[left] | nums[right] == nums[right]) break
      nums[left] = nums[left] | nums[right]
      ans = Math.min(ans, Math.abs(nums[left] - k))
    }
  }
  return ans
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  let ans = Number.MAX_SAFE_INTEGER
  const n = nums.length
  for (let right = 0; right < n; right++) {
    for (let left = right; left >= 0; left--) {
      if (nums[left] | nums[right] == nums[right]) break
      nums[left] = nums[left] | nums[right]
      ans = Math.min(ans, Math.abs(nums[left] - k))
    }
  }
  return ans
};


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  let ans = Number.MAX_SAFE_INTEGER
  const n = nums.length
  for (let right = 0; right < n; right++) {
    // 想明白了这句话为什么要放这里  不能跟循环里面的那句话合并写一起了
    ans = Math.min(ans, Math.abs(nums[right] - k))
    for (let left = right - 1; left >= 0 && nums[left] | nums[right] != nums[left]; left--) {
      nums[left] |= nums[right]
      ans = Math.min(ans, Math.abs(nums[left] - k))
    }
  }
  return ans
};
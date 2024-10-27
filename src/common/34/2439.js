/**
 * @param {number[]} nums
 * @return {number}
 */
var minimizeArrayValue = function (nums) {
  const check = (limit) => {
    let a = nums.slice()
    const n = nums.length
    for (let i = n - 1; i >= 0; i--) {
      let x = a[i]
      // 右边的减去多少 左边的那个数就应该加上多少
      if (x > limit) {
        a[i - 1] += x - limit
      }
    }
    return a[0] <= limit
  }
  // 左开右开区间
  let left = -1, right = Math.max(...nums)
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1)
    if (check(mid)) {
      right = mid
    } else {
      left = mid
    }
  }
  return right

};


// 方法二是对上面方法一的优化

// 方法二是对上面方法一的优化
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimizeArrayValue = function (nums) {
  const check = (limit) => {
    let extra = 0
    const n = nums.length
    for (let i = n - 1; i > 0; i--) {
      extra = Math.max(nums[i] + extra - limit, 0)
    }
    return nums[0] + extra <= limit
  }
  // 左开右开区间
  let left = -1, right = Math.max(...nums)
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1)
    if (check(mid)) {
      right = mid
    } else {
      left = mid
    }
  }
  return right

};



/**
 * @param {number[]} nums
 * @return {number}
 */
var minimizeArrayValue = function (nums) {
  let ans = 0n
  let s = 0n
  for (let i = 0; i < nums.length; i++) {
    s += BigInt(nums[i])
    // s + i) / (i + 1) 其实是 Math.ceill((s)/(i+1))
    let cur = (s + BigInt(i)) / (BigInt(i + 1))
    if (cur > ans) {
      ans = cur
    }
  }
  return Number(ans)
};
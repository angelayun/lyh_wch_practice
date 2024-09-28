const lowerBound = (nums, target) => {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    // console.log(nums[mid], f(nums[mid]))
    if (nums[mid][0] <= target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
}
const lowerBound = (nums, target) => {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    // console.log(nums[mid], f(nums[mid]))
    if (nums[mid][0] <= target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
}
/**
 * @param {number[]} nums
 * @param {number[]} changeIndices
 * @return {number}
 */
var earliestSecondToMarkIndices = function (nums, changeIndices) {
  let n = nums.length, m = changeIndices.length
  // 考试的天数都没有课程多
  if (n > m) return -1
  const check = (mx) => {
    let lastT = new Array(n).fill(-1)
    for (let t = 0; t < mx; t++) {
      lastT[changeIndices[t] - 1] = t
    }
    // 有课程没有考试时间
    if (lastT.indexOf(-1) > -1) {
      return false
    }
    let cnt = 0
    for (let i = 0; i < mx; i++) {
      let idx = changeIndices[i] - 1
      if (i == lastT[idx]) {
        // 考试
        if (nums[idx] > cnt) {
          // 没时间复习
          return false
        }
        // 复习这门课程
        cnt -= nums[idx]
      } else {
        cnt++ // 留着后面用
      }
    }
    return true
  }

  let left = n - 1, right = m + 1;
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1);
    if (check(mid)) {
      right = mid;
    } else {
      left = mid;
    }
  }
  // console.log(right, m)
  // return 0
  return right > m ? -1 : right;
};
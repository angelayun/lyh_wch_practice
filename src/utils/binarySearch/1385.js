/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
var findTheDistanceValue = function (arr1, arr2, d) {
  arr1.sort((a, b) => a - b)
  arr2.sort((a, b) => a - b)
  // 对于 arr1中的每一个元素去找arr2的位置   并且所有arr2中的值 <=d
  let lowerBound = (nums, target) => {
    let left = 0, right = nums.length - 1
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      if (nums[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    // left指向第一个>=target的位置
    return left
  }
  const n = arr1.length
  let count = 0
  for (let x of arr1) {
    let index = lowerBound(arr2, x)
    // 如果arr2中所有元素都小于x 则index=n
    if (index == n) {
      index = n - 1
    }
    if (Math.abs(x - arr2[index]) <= d || (index > 0 && Math.abs(x - arr2[index - 1]) <= d) || (index < n - 1 && Math.abs(x - arr2[index + 1]) <= d)) {
      continue
    }
    count++
  }
  return count
};
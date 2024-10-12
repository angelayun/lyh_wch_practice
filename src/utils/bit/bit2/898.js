/**
 * @param {number[]} arr
 * @return {number}
 */
var subarrayBitwiseORs = function (arr) {
  let set = new Set()
  let count = 0
  const n = arr.length
  for (let right = 0; right < n; right++) {
    // set.add(arr[right])
    count++
    for (let left = right - 1; left >= 0 && ((arr[left] | arr[right]) != arr[left]); left++) {
      arr[left] |= arr[right]
      // set.add(arr[left])
      count++
    }
  }
  // return set.size
  return count
};
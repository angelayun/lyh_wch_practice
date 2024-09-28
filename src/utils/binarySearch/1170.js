/**
 * @param {string[]} queries
 * @param {string[]} words
 * @return {number[]}
 */
var numSmallerByFrequency = function (queries, words) {
  const f = (s) => {
    let arr = new Array(26).fill(0)
    for (let x of s) {
      let index = x.charCodeAt() - 'a'.charCodeAt()
      arr[index]++
    }
    for (let j = 0; j < 26; j++) {
      if (arr[j] != 0) {
        return arr[j]
      }
    }
    return 0
  }
  const lowerBound = (nums, target) => {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      // console.log(nums[mid], f(nums[mid]))
      if (nums[mid] <= target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return left
  }
  const n = queries.length
  for (let i = 0; i < words.length; i++) {
    words[i] = f(words[i])
  }
  words.sort((a, b) => a - b)
  console.log(words)
  let res = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    let target = f(queries[i])
    let index = lowerBound(words, target)
    res[i] = words.length - index
    console.log(queries[i], target, res[i])
  }
  return res
};
/**
 * @param {number[]} nums
 * @param {number} space
 * @return {number}
 */
var destroyTargets = function (nums, space) {
  let cnt = new Map()
  for (let x of nums) {
    let list = []
    let key = x % space
    if (cnt.has(key)) {
      list = cnt.get(key)
    }
    list.push(x)
    cnt.set(key, list)
  }
  let max = 0, ans = 0
  for (let a of cnt.values()) {
    let m = a.length, low = Math.min(...a)
    if (m > max || m == max && low < ans) {
      max = m;
      ans = low
    }
  }
  return ans
};
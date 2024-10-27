/**
 * @param {number} n
 * @param {number} k
 * @param {number} budget
 * @param {number[][]} composition
 * @param {number[]} stock
 * @param {number[]} cost
 * @return {number}
 */
var maxNumberOfAlloys = function (n, k, budget, composition, stock, cost) {
  let ans = 0
  let max = Math.min(...stock) + budget
  for (let comp of composition) {
    const check = (num) => {
      let money = 0
      for (let i = 0; i < n; i++) {
        if (stock[i] < comp[i] * num) {
          money += (comp[i] * num - stock[i]) * cost[i]
        }
        if (money > budget) return false
      }
      return true
    }
    let left = ans, right = max + 1
    while (left + 1 < right) {
      let mid = left + ((right - left) >> 1)
      if (check(mid)) {
        left = mid
      } else {
        right = mid
      }
    }
    ans = left
  }
  return ans
};
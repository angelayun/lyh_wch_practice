/**
 * @param {number[]} maxHeights
 * @return {number}
 */
var maximumSumOfHeights = function (a) {
  const n = a.length;
  let suf = new Array(n + 1).fill(0)
  let stack = [n] // 哨兵
  let sum = 0
  for (let i = n - 1; i >= 0; i--) {
    let x = a[i]
    while (stack.length > 1 && x <= a[stack[stack.length - 1]]) {
      let j = stack.pop()
      sum -= a[j] * (stack[stack.length - 1] - j) // 从i到st[-1]-1都是x
    }
    sum += x * (stack[stack.length - 1] - i)
    suf[i] = sum
    stack.push(i)
  }
  stack = [-1]
  let pre = 0
  let ans = 0
  for (let i = 0; i < n; i++) {
    let x = a[i]
    while (stack.length > 1 && x <= a[stack[stack.length - 1]]) {
      let j = stack.pop()
      pre -= a[j] * (j - stack[stack.length - 1])
    }
    pre += x * (i - stack[stack.length - 1])
    ans = Math.max(ans, pre + suf[i + 1])
    stack.push(i)
  }
  return ans
};
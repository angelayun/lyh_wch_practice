/**
 * @param {number[]} price
 * @param {number} k
 * @return {number}
 */
var maximumTastiness = function (price, k) {
  price.sort((a, b) => a - b)
  const n = price.length
  // f(d) 表示甜蜜度至少为 d 时，至多能选多少类糖果
  const f = (d) => {
    let cnt = 1, pre = price[0]
    for (let p of price) {
      if (p >= pre + d) {
        cnt++
        pre = p
      }
    }
    return cnt
  }
  // 这个是开区间的写法
  let left = 0, right = price[n - 1] - price[0]
  while (left + 1 < right) {
    mid = left + ((right - left) >> 1)
    if (f(mid) >= k) {
      left = mid
    } else {
      right = mid
    }
  }
  return left
};
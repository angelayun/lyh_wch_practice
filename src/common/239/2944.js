/**
 * @param {number[]} prices
 * @return {number}
 */
var minimumCoins = function (prices) {
  const n = prices.length
  const memo = new Array(~~((n + 1) / 2)).fill(0)
  const dfs = (i) => {
    // if (i > n) return 0
    if (2 * i >= n) return prices[i - 1]
    if (memo[i] != 0) {
      return memo[i]
    }
    let res = Infinity
    for (let j = i + 1; j < i * 2 + 2; j++) {
      res = Math.min(res, dfs(j))
    }
    return memo[i] = res + prices[i - 1]
  }
  return dfs(1)
};


/**
 * @param {number[]} prices
 * @return {number}
 */
var minimumCoins = function (prices) {
  const n = prices.length
  for (let i = ~~((n + 1) / 2) - 1; i > 0; i--) {
    let mn = Number.MAX_SAFE_INTEGER
    for (let j = i; j <= i * 2; j++) {
      mn = Math.min(mn, prices[j])
    }
    prices[i - 1] += mn
  }
  return prices[0]
};



/**
 * @param {number[]} prices
 * @return {number}
 */
var minimumCoins = function (prices) {
  const n = prices.length
  // 增加了一个哨兵节点
  let queue = [[n + 1, 0]]
  for (let i = n; i > 0; i--) {
    // 右边的离开窗口
    while (queue[queue.length - 1][0] > i * 2 + 1) {
      queue.pop()
    }
    let f = prices[i - 1] + queue[queue.length - 1][1]
    while (f <= queue[0][1]) {
      queue.shift();
    }
    queue.unshift([i, f])
  }
  return queue[0][1]
};
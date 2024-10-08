/**
 * @param {string} source
 * @param {string} target
 * @param {character[]} original
 * @param {character[]} changed
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function (source, target, original, changed, cost) {
  const INF = ~~(Number.MAX_SAFE_INTEGER / 2)
  let dist = Array.from({ length: 26 }, () => new Array(26).fill(INF))
  // 自己到自己的距离是0
  for (let i = 0; i < 26; i++) dist[i][i] = 0
  // 计算最短路
  for (let i = 0; i < original.length; i++) {
    let x = original[i].charCodeAt() - 'a'.charCodeAt(), y = changed[i] - 'a'.charCodeAt(), c = cost[i]
    dist[x][y] = Math.min(dist[x][y], c)
  }
  for (let k = 0; k < 26; k++) {
    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < 26; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j])
      }
    }
  }
  let ans = 0n
  for (let i = 0; i < source.length; i++) {
    let d = dist[source[i].charCodeAt() - 'a'.charCodeAt()][target[i].charCodeAt() - 'a'.charCodeAt()]
    if (d == INF) return -1
    ans += BigInt(d)
  }
  return Number(ans)
};
/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
var closestMeetingNode = function (edges, node1, node2) {
  const n = edges.length
  let minDist = edges.length, ans = -1
  const calc_dist = (x) => {
    let dist = new Array(n).fill(n)
    let d = 0
    // 没有被访问过  并且是一个有效节点
    while (x >= 0 && dist[x] == n) {
      dist[x] = d
      d += 1
      x = edges[x]
    }
    return dist
  }
  let dist1 = calc_dist(node1), dist2 = calc_dist(node2)
  for (let i = 0; i < dist1.length; i++) {
    let d = Math.max(dist1[i], dist2[i])
    if (d < minDist) {
      minDist = d;
      ans = i
    }
  }
  return ans
};
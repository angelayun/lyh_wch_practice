/**
 * // Definition for a QuadTree node.
 * function _Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */

/**
 * @param {number[][]} grid
 * @return {_Node}
 */
var construct = function (grid) {
  // 本题需要递归枚举正方形，直到正方形全是1或全是0为止。否则就切割成四个小正方形继续递归。
  // 判断全1或全0可以很容易想到，二维前缀和的结果是正方形的大小或0。
  const m = grid.length,
    n = grid[0].length;
  const presum = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      presum[i + 1][j + 1] =
        presum[i + 1][j] + presum[i][j + 1] - presum[i][j] + grid[i][j];
  const dfs = (x0, y0, x1, y1) => {
    const diff =
      presum[x1][y1] - presum[x0][y1] - presum[x1][y0] + presum[x0][y0];
    // 全为0的情况
    if (diff == 0) return new Node(false, true, null, null, null, null);
    // 长*宽为总数  全为1的情况
    else if (diff == (x1 - x0) * (y1 - y0))
      return new Node(true, true, null, null, null, null);
    const hx = Math.floor((x0 + x1) / 2),
      hy = Math.floor((y0 + y1) / 2);
    return new Node(
      true,
      false,
      dfs(x0, y0, hx, hy),
      dfs(x0, hy, hx, y1),
      dfs(hx, y0, x1, hy),
      dfs(hx, hy, x1, y1)
    );
  };
  return dfs(0, 0, m, n);
};

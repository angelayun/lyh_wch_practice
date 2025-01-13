/**
 * @param {number[][]} tiles
 * @param {number} carpetLen
 * @return {number}
 */
var maximumWhiteTiles = function (tiles, carpetLen) {
  const n = tiles.length;
  let cover = 0;
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    let [tl, tr, c] = tiles[right];
    cover += (tr - tl + 1) * c;
    while (tiles[left][1] < tr - carpetLen + 1) {
      // 只要左边 右端点不在 就把整个都删除了
      cover -= (tiles[left][1] - tiles[left][0] + 1) * tiles[left][2];
      left++;
    }
    let uncover = Math.max(
      0,
      (tr - carpetLen + 1 - tiles[left][0]) * tiles[left][2]
    );
    ans = Math.max(ans, cover - uncover);
  }
  return ans;
};

/**
 * @param {number[][]} coins
 * @param {number} k
 * @return {number}
 */
var maximumCoins = function (coins, k) {
  coins.sort((a, b) => a[0] - b[0]);
  let ans = maximumWhiteTiles(coins, k);
  coins.reverse();
  for (let t of coins) {
    [t[0], t[1]] = [t[1], t[0]];
  }
  return Math.max(ans, maximumWhiteTiles(coins, k));
};

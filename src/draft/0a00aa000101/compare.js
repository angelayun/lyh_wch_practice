/**
 * @param {number[][]} tiles
 * @param {number} carpetLen
 * @return {number}
 */
var maximumWhiteTiles = function (tiles, carpetLen) {
  tiles.sort((a, b) => a[0] - b[0]);
  let cover = 0;
  const n = tiles.length;
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    let [tl, tr] = tiles[right];
    // 先把右边毯子长度加上
    cover += tr - tl + 1;
    while (right > left && tr - carpetLen + 1 >= tiles[left][0]) {
      // 缩短窗口 把左边毯子长度去掉
      cover -= tiles[left][1] - tiles[left][0] + 1;
      left++;
    }
    ans = Math.max(
      ans,
      cover -
        Math.max(
          // 最大的左端点的位置   之前已经加上的左边毯子的数量   减去多加的那部分
          tr - carpetLen + 1 - tiles[left][0],
          0
        )
    );
  }
  return ans;
};

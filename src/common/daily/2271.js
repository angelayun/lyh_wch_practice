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
    let [tl, tr] = tiles[right];
    cover += tr - tl + 1;
    while (tiles[left][1] < tr - carpetLen + 1) {
      // 只要左边 右端点不在 就把整个都删除了  
      cover -= tiles[left][1] - tiles[left][0] + 1;
      left++;
    }
    ans = Math.max(
      ans,
      cover - Math.max(0, tr - carpetLen + 1 - tiles[left][0])
    );
  }
  return ans;
};

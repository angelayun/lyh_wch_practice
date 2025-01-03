/**
 * @param {number[][]} tiles
 * @param {number} carpetLen
 * @return {number}
 */
var maximumWhiteTiles = function (tiles, carpetLen) {
  tiles.sort((a, b) => a[0] - b[0]);
  let cover = 0;
  let ans = 0;
  for (let left = 0, right = 0; right < tiles.length; right++) {
    let [tl, tr] = tiles[right];
    cover += tr - tl + 1;
    while (tiles[left][1] < tr - carpetLen + 1) {
      let [ll, lr] = tiles[left];
      cover -= lr - ll + 1;
      left++;
    }
    ans = Math.max(ans,
     cover- Math.max(0, tr-carpetLen+1-tiles[left][0] )
    )
  }
  return ans;
};

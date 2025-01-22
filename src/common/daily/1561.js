/**
 * @param {number[]} piles
 * @return {number}
 */
var maxCoins = function (piles) {
  // 从大到小排序
  piles.sort((a, b) => b - a);
  let n = piles.length;
  piles.splice(0, Math.floor(n / 3));
  let ans = 0;
  for (let i = 1; i < n; i + 2) {
    ans += piles[i];
  }
  return ans;
};

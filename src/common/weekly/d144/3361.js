/**
 * @param {string} s
 * @param {string} t
 * @param {number[]} nextCost
 * @param {number[]} previousCost
 * @return {number}
 */
var shiftDistance = function (s, t, nextCost, previousCost) {
  let preSumNext = new Array(53).fill(0);
  let preSumPrevious = new Array(53).fill(0);
  for (let i = 0; i < preSumNext.length - 1; i++) {
    preSumNext[i + 1] = preSumNext[i] + nextCost[i % 26];
    preSumPrevious[i + 1] = preSumPrevious[i] + previousCost[i % 26];
  }
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    let x = s[i].charCodeAt() - 'a'.charCodeAt(),
      y = t[i].charCodeAt() - 'a'.charCodeAt();
    ans += Math.min(
      // x->y   y要比x大
      preSumNext[y < x ? y + 26 : y] - preSumNext[x],
      // y->x  x要比y大  （x在右边  y在左边）
      preSumPrevious[(x < y ? x + 26 : x) + 1] - preSumPrevious[y + 1]
    );
  }
  return ans;
};

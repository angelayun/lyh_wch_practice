/**
 * @param {string} s
 * @param {string} t
 * @param {number[]} nextCost
 * @param {number[]} previousCost
 * @return {number}
 */
var shiftDistance = function (s, t, nextCost, previousCost) {
  const SIGMA = 26;
  let nextSum = new Array(SIGMA * 2 + 1).fill(0);
  let prevSum = new Array(SIGMA * 2 + 1).fill(0);
  for (let i = 0; i < SIGMA * 2; i++) {
    nextSum[i + 1] = nextSum[i] + nextCost[i % SIGMA];
    prevSum[i + 1] = prevSum[i] + previousCost[i % SIGMA];
  }
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    let x = s[i].charCodeAt() - 'a'.charCodeAt();
    let y = t[i].charCodeAt() - 'a'.charCodeAt();
    ans += Math.min(
      nextSum[y < x ? y + SIGMA : y] - nextSum[x],
      prevSum[(x < y ? x + SIGMA : x) + 1] - prevSum[y + 1]
    );
  }
  return ans;
};

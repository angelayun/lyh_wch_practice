let preSum = new Array(1000).fill(0);
const dfs = (p, sum, s, i) => {
  const n = s.length;
  if (p == n) {
    return sum == i;
  }
  let x = 0;
  for (let j = p; j < n; j++) {
    x = x * 10 + Number(s[j]);
    if (dfs(j + 1, sum + x, s, i)) {
      return true;
    }
  }
  return false;
};
for (let i = 1; i <= 1000; i++) {
  let s = (i * i).toString();
  preSum[i] = preSum[i - 1] + (dfs(0, 0, s, i) ? i * i : 0);
}
/**
 * @param {number} n
 * @return {number}
 */
var punishmentNumber = function (n) {
  return preSum[n];
};

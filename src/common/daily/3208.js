/**
 * @param {number[]} colors
 * @param {number} k
 * @return {number}
 */
var numberOfAlternatingGroups = function (colors, k) {
  const n = colors.length;
  let ans = 0;
  let cnt = 0;
  for (let i = 0; i < 2 * n; i++) {
    if (i > 0 && colors[(i - 1) % n] == colors[i % n]) cnt = 0;
    cnt++;
    if (cnt >= k) {
      ans++;
    }
  }
  return ans;
};

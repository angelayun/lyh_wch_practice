/**
 * @param {number[]} colors
 * @param {number} k
 * @return {number}
 */
var numberOfAlternatingGroups = function (colors, k) {
  let cnt = 0;
  let ans = 0;
  const n = colors.length;
  for (let i = 0; i < 2 * n; i++) {
    if (i > 0 && colors[(i - 1) % n] == colors[i % n]) {
      cnt = 0;
    }
    cnt++;
    if (i >= n && cnt >= k) {
      ans++;
    }
  }
  return ans;
};

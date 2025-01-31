/**
 * @param {number[]} colors
 * @param {number} k
 * @return {number}
 */
var numberOfAlternatingGroups = function (colors, k) {
  let ans = 0;
  let cnt = 0;
  const n = colors.length;
  for (let i = 0; i < 2 * n; i++) {
    if (i > 0 && colors[i % n] == colors[(i - 1) % n]) {
      cnt = 0;
    }
    cnt++;
    if (i >= n && cnt >= k) {
      ans++;
    }
  }
  return ans;
};

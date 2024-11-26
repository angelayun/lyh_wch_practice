/**
 * @param {number[]} colors
 * @param {number} k
 * @return {number}
 */
var numberOfAlternatingGroups = function (colors, k) {
  let n = colors.length;
  let cnt = 0;
  let ans = 0;
  for (let i = 0; i < n * 2; i++) {
    if (i > 0 && colors[i % n] == colors[(i - 1) % n]) cnt = 0;
    cnt++;
    if (i >= n && cnt >= k) ans++;
  }
  return ans;
};

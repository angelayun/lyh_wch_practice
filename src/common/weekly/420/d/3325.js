/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numberOfSubstrings = function (s, k) {
  let cnt = new Map();
  const n = s.length;
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    let x = s[right];
    cnt.set(x, (cnt.get(x) || 0) + 1);
    while (cnt.get(x) >= k) {
      let y = s[left];
      cnt.set(y, (cnt.get(y) || 0) - 1);
      left++;
    }
    ans += left;
  }
  return ans;
};

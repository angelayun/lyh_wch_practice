/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var countKConstraintSubstrings = function (s, k) {
  let count = [0, 0];
  const n = s.length;
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    count[s[right] % 2]++;
    // 这里是&& 不是|| 
    while (count[0] > k && count[1] > k) {
      count[s[left] % 2]--;
      left++;
    }
    ans += right - left + 1;
  }
  return ans;
};

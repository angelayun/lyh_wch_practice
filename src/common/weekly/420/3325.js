/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numberOfSubstrings = function (s, k) {
  let ans = 0;
  let cnt = new Array(26).fill(0);
  for (let left = 0, right = 0; right < s.length; right++) {
    let index = s[right].charCodeAt() - 'a'.charCodeAt();
    cnt[index]++;
    while (cnt[index] >= k) {
      cnt[s[left].charCodeAt() - 'a'.charCodeAt()]--;
      left++;
    }
    ans += left;
  }
  return ans;
};

/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
  let cnt = new Array(3).fill(0);
  let ans = 0;
  const n = s.length;
  for (let left = 0, right = 0; right < n; right++) {
    let index = s[right].charCodeAt() - 'a'.charCodeAt();
    cnt[index]++;
    while (cnt[0] > 0 && cnt[1] > 0 && cnt[2] > 0) {
      cnt[s[left].charCodeAt() - 'a'.charCodeAt()]--;
      left++;
    }
    ans += left;
  }
  return ans;
};

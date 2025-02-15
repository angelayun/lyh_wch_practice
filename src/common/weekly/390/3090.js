/**
 * @param {string} s
 * @return {number}
 */
var maximumLengthSubstring = function (s) {
  let maxLen = 0;
  let cnt = new Array(26).fill(0);
  for (let left = 0, right = 0; right < s.length; right++) {
    let rIndex = s[right].charCodeAt() - 'a'.charCodeAt();
    cnt[rIndex]++;
    while (cnt[rIndex] > 2) {
      let lIndex = s[left].charCodeAt() - 'a'.charCodeAt();
      cnt[lIndex]--;
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
};

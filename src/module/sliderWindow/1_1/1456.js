/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  let vowel = ['a', 'e', 'i', 'o', 'u'];
  const n = s.length;
  let maxCnt = 0;
  let cnt = 0;
  for (let left = 0, right = 0; right < n; right++) {
    cnt += vowel.includes(s[right]) ? 1 : 0;
    while (right - left + 1 > k) {
      cnt -= vowel.includes(s[left]) ? 1 : 0;
      left++;
    }
    maxCnt = Math.max(maxCnt, cnt);
  }
  return maxCnt;
};

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  let vowel = ['a', 'e', 'i', 'o', 'u'];
  const n = s.length;
  let cnt = 0;
  for (let i = 0; i < k; i++) {
    cnt += vowel.includes(s[i]) ? 1 : 0;
  }
  let maxCnt = cnt;
  for (let i = k; i < n; i++) {
    cnt += (vowel.includes(s[i]) ? 1 : 0) - (vowel.includes(s[i - k]) ? 1 : 0);
    maxCnt = Math.max(maxCnt, cnt);
  }
  return maxCnt;
};

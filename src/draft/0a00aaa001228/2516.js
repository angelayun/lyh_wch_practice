/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var takeCharacters = function (s, k) {
  let cnt = new Array(3).fill(0);
  for (let x of s) {
    let index = x.charCodeAt() - 'a'.charCodeAt();
    cnt[index]++;
  }
  // 把所有都取走都不够
  if (cnt[0] < k || cnt[1] < k || cnt[2] < k) {
    return -1;
  }
  // 左右都取走k个字符  那么中间的最大长度
  cnt[0] -= k;
  cnt[1] -= k;
  cnt[2] -= k;
  let winCnt = new Array(3).fill(0);
  let maxLen = 0;
  for (let left = 0, right = 0; right < s.length; right++) {
    let x = s[right].charCodeAt() - 'a'.charCodeAt();
    winCnt[x]++;
    while (winCnt[0] > cnt[0] || winCnt[1] > cnt[1] || winCnt[2] > cnt[2]) {
      let y = s[left].charCodeAt() - 'a'.charCodeAt();
      winCnt[y]--;
      left++;
    }
    // 不需要这个条件
    // if (winCnt[0] == cnt[0] && winCnt[1] == cnt[1] && winCnt[2] == cnt[2]) {
    maxLen = Math.max(maxLen, right - left + 1);
    // }
  }
  return s.length - maxLen;
};
//
// aab  aaaa  caabc

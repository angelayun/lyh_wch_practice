/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
var maxConsecutiveAnswers = function (answerKey, k) {
  let cnt = [0, 0];
  let n = answerKey.length;
  let res = Number.MIN_SAFE_INTEGER
  for (let left = 0, right = 0; right < n; right++) {
    let x = answerKey[right] == 'T' ? 1 : 0;
    cnt[x]++;
    while (Math.min(...cnt) > k) {
      let y = answerKey[left] == 'T' ? 1 : 0;
      cnt[y]--;
      left++;
    }
    res = Math.max(res, right - left + 1);
  }
  return res;
};

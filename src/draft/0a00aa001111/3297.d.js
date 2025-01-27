/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var validSubstringCount = function (word1, word2) {
  let cnt = new Array(26).fill(0);
  let ans = 0;
  let count = 0;
  for (let x of word2) {
    let index = x.charCodeAt() - 'a'.charCodeAt();
    if (cnt[index] == 0) count++;
    cnt[index]++;
  }
  for (let left = 0, right = 0; right < word1.length; right++) {
    let index = word1[right].charCodeAt() - 'a'.charCodeAt();
    cnt[index]--;
    if (cnt[index] == 0) count--;
    while (count == 0) {
      let yIndex = word1[left].charCodeAt() - 'a'.charCodeAt();
      if (cnt[yIndex] == 0) count++;
      cnt[yIndex]++;
    }
    ans += right - left + 1;
  }

  return ans;
};

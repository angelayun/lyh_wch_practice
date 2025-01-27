/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countOfSubstrings = function (word, k) {
  let count = (k) => {
    let ans = 0;
    let vowel = ['a', 'e', 'i', 'o', 'u'];
    const n = word.length;
    let consonantCount = 0;
    let cnt = new Array(5).fill(0);
    for (let left = 0, right = 0; right < n; right++) {
      let x = word[right];
      let index = vowel.indexOf(x);
      if (index > -1) {
        cnt[index]++;
      } else {
        consonantCount++;
      }
      while (cnt.every((v) => v >= 1) && consonantCount >= k) {
        ans += right - left + 1;
        let y = word[left];
        let index = vowel.indexOf(y);
        if (index > -1) {
          cnt[index]--;
        } else {
          consonantCount--;
        }
        left++;
      }
    }
    return ans;
  };
  return count(k) - count(k + 1);
};

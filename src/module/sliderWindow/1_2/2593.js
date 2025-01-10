/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countCompleteSubstrings = function (word, k) {
  const n = word.length;
  let ans = 0;
  const func = (s) => {
    let res = 0;
    for (let m = 1; m <= 26 && k * m <= s.length; m++) {
      const check = () => {
        for (let i = 0; i < 26; i++) {
          if (cnt[i] && cnt[i] != k) {
            return;
          }
        }
        res++;
      };
      let cnt = new Array(26).fill(0);
      for (let right = 0; right < s.length; right++) {
        cnt[s[right].charCodeAt() - 'a'.charCodeAt()]++;
        let left = right + 1 - k * m;
        if (left >= 0) {
          check();
          cnt[s[left].charCodeAt() - 'a'.charCodeAt()]--;
        }
      }
    }
    return res;
  };

  for (let i = 0; i < n; ) {
    let start = i;
    for (
      i++;
      i < n && Math.abs(word[i].charCodeAt() - word[i - 1].charCodeAt()) <= 2;
      i++
    ) {}
    ans += func(word.substr(start, i - start));
  }
  return ans;
};

/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countOfSubstrings = function (word, k) {
  const winSlider = (k) => {
    // 存元音字母
    let cnt = new Map();
    let cnt2 = 0;
    let ans = 0;
    for (let left = 0, right = 0; right < word.length; right++) {
      let x = word[right];
      if ('aeiou'.includes(x)) {
        cnt.set(x, (cnt.get(x) || 0) + 1);
      } else cnt2++;
      while (cnt.size >= 5 && cnt2 >= k) {
        let y = word[left];
        if ('aeiou'.includes(y)) {
          cnt.set(y, (cnt.get(y) || 0) - 1);
          if (cnt.get(y) == 0) {
            cnt.delete(y);
          }
        } else cnt2--;
        left++;
      }
      ans += left;
    }
    return ans;
  };
  return winSlider(k) - winSlider(k + 1);
};

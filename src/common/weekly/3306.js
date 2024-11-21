/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countOfSubstrings = function (word, k) {
  let winSlider = (word, k) => {
    // 每种元音的个数
    let cnt1 = new Map();
    let ans = 0;
    // 辅音个数
    let cnt2 = 0;
    for (let left = 0, right = 0; right < word.length; right++) {
      let b = word[right];
      if ('aeiou'.indexOf(b) > -1) {
        cnt1.set(b, (cnt1.get(b) || 0) + 1);
      } else cnt2++;
      while (cnt1.size == 5 && cnt2 >= k) {
        let out = word[left];
        if ('aeiou'.indexOf(out) > -1) {
          cnt1.set(out, cnt1.get(out) - 1);
          if (cnt1.get(out) == 0) cnt1.delete(out);
        } else cnt2 -= 1;
        left++;
      }
      // 0到left-1是满足要求的
      ans += left;
    }
    return ans;
  };
  return winSlider(word, k) - winSlider(word, k + 1);
};

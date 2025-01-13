/**
 * @param {string} s
 * @return {number}
 */
var calculateScore = function (s) {
  let cnt = Array.from({ length: 26 }, () => []);
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    let index = s[i].charCodeAt() - 'a'.charCodeAt();
    let yIndex = 25 - index;
    if (cnt[yIndex].length) {
      ans += i - cnt[yIndex][cnt[yIndex].length - 1];
      cnt[yIndex].pop();
    } else {
      cnt[index].push(i);
    }
  }
  return ans;
};

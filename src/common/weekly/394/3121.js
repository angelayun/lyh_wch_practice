/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function (word) {
  let ans = 0;
  let state = Array.from({ length: 27 }, () => 0);
  for (let c of word) {
    c = c.charCodeAt();
    let x = c & 31;
    // console.log(x)
    if (c & 32) {// 小写字母从右往左第6位上是1
      // 小写字母
      if (state[x] == 0) state[x] = 1;
      else if (state[x] == 2) {
        state[x] = -1;
        ans--;
      }
    } else {
      // 大写字母
      if (state[x] == 0) {
        state[x] = -1;
      } else if (state[x] == 1) {
        state[x] = 2;
        ans++;
      }
    }
  }
  return ans;
};

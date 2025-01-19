/**
 * @param {string} word
 * @param {number} numFriends
 * @return {string}
 */
var answerString = function (word, numFriends) {
  if (numFriends == 1) return word;
  let ans = '';
  const n = word.length;
  for (let i = 0; i < n; i++) {
    let cur = word.slice(i, i + n - numFriends + 1);
    // if (ans == '' || ans < cur) {
    if (cur.localeCompare(ans) > 0) ans = cur;
  }
  return ans;
};
// 原来还能如此用localeCompare
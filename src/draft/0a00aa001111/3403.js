/**
 * @param {string} word
 * @param {number} numFriends
 * @return {string}
 */
var answerString = function (word, numFriends) {
  const n = word.length;
  let ans = '';
  for (let i = 0; i < n - numFriends; i++) {
    let cur = word.substring(0, i + 1);
    if (cur.localeCompare(ans) > ans) {
      ans = cur;
    }
  }
  return ans;
};

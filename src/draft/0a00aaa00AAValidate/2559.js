/**
 * @param {string[]} words
 * @param {number[][]} queries
 * @return {number[]}
 */
var vowelStrings = function (words, queries) {
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  const n = words.length;
  const m = queries.length;
  let ans = [];
  let preSum = [0];
  for (let word of words) {
    let isValid =
      vowels.includes(word[0]) && vowels.includes(word[word.length - 1]);
    preSum.push(preSum[preSum.length - 1] + (isValid ? 1 : 0));
  }
  for (let [l, r] of queries) {
    ans.push(preSum[r + 1] - preSum[l]);
  }
  return ans;
};

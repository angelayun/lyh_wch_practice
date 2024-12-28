/**
 * @param {string[]} words
 * @param {number[][]} queries
 * @return {number[]}
 */
var vowelStrings = function (words, queries) {
  const n = words.length;
  const vowel = 'aeiou';
  let preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    let x = words[i];
    preSum[i + 1] +=
      preSum[i] +
      (vowel.includes(x[0]) && vowel.includes(x[x.length - 1]) ? 1 : 0);
  }
  const m = queries.length;
  let ans = [];
  for (let [l, r] of queries) {
    ans.push(preSum[r + 1] - preSum[l]);
  }
  return ans;
};

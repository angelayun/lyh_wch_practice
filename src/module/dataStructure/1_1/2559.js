/**
 * @param {string[]} words
 * @param {number[][]} queries
 * @return {number[]}
 */
var vowelStrings = function (words, queries) {
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  const n = words.length;
  let preSum = [0];
  for (let x of words) {
    // 是否是  元音开头 结尾也是元音
    let isValidate = vowels.includes(x[0]) && vowels.includes(x[x.length - 1]);
    // 下面的三则运算得用括号括起来
    preSum.push(preSum[preSum.length - 1] + (isValidate ? 1 : 0));
  }
  let ans = [];
  for (let [l, r] of queries) {
    ans.push(preSum[r + 1] - preSum[l]);
  }
  return ans;
};

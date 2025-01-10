/**
 * @param {string[]} words
 * @param {number[]} groups
 * @return {string[]}
 */
var getLongestSubsequence = function (words, groups) {
  const n = words.length;
  let ans = [words[0]];
  let j = 0;
  for (let i = 1; i < n; i++) {
    if (groups[i] != groups[j]) {
      ans.push(groups[i]);
      j = i;
    }
  }
  return ans;
};

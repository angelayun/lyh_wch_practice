/**
 * @param {string[]} words
 * @return {number}
 */
var countPrefixSuffixPairs = function (words) {
  let ans = 0;
  const n = words.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (words[j].endsWith(words[i]) && words[j].startsWith(words[i])) ans++;
    }
  }
  return ans;
};

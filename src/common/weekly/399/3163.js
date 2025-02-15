/**
 * @param {string} word
 * @return {string}
 */
var compressedString = function (word) {
  let n = word.length;
  let start = 0;
  let res = [];
  for (let i = 0; i < n; i++) {
    let c = word[i];
    if (i == n - 1 || c != word[i + 1]) {
      let size = i - start + 1;
      res.push(('9' + c).repeat(~~(size / 9)));
      if (size % 9) res.push((size % 9) + c);
      start = i + 1;
    }
  }
  return res.join('');
};

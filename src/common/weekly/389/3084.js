/**
 * @param {string} s
 * @param {character} c
 * @return {number}
 */
var countSubstrings = function (s, c) {
  let cnt = 0;
  for (let x of s) {
    if (x == c) cnt++;
  }
  // 出现的第一个c 可以组成1个子串
  // 出现的第二个c 可以组成2个子品
  // 等左数列的求和公式
  return ((1 + cnt) * cnt) / 2;
};

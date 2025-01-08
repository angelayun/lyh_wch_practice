/**
 * @param {string} s
 * @return {number}
 */
var countKeyChanges = function (s) {
  let cnt = 0;
  let pre = s[0].toLowerCase().charCodeAt();
  for (let i = 1; i < s.length; i++) {
    let x = s[i].toLowerCase().charCodeAt();
    if (x != pre) {
      cnt++;
    }
    pre = x;
  }
  return cnt;
};

// 下面用灵神的思路写一遍
/**
 * @param {string} s
 * @return {number}
 */
var countKeyChanges = function (s) {
  let cnt = 0;
  // 对于同一字母的大写和小写，ASCII 值的二进制的低 5 位是相同的
  for (let i = 1; i < s.length; i++) {
    if ((s[i].charCodeAt() & 31) != (s[i - 1].charCodeAt() & 31)) {
      cnt++;
    }
  }
  return cnt;
};

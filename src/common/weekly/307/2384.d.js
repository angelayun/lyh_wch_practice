/**
 * @param {string} num
 * @return {string}
 */
var largestPalindromic = function (num) {
  let cnt = new Array(10).fill(0);
  for (let x of num) {
    cnt[Number(x)]++;
  }
  if (num.length == cnt[0]) {
    return '0';
  }
  let s = [];
  for (let i = 9; i >= 1; i--) {
    if (cnt[i] >> 1) {
      s.push(i.toString().repeat(cnt[i] >> 1));
    }
  }
  console.log(s);
  if (s.length) {
    s.push('0'.repeat(cnt[0] >> 1));
  }
  let mid = '';
  // 再看中间这一位是否有值可以填
  for (let i = 9; i >= 0; i--) {
    if (cnt[i] & 1) {
      mid = i.toString();
      break;
    }
  }
  return s.join('') + mid + s.reverse().join('');
};

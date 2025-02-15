/**
 * @param {string} s
 * @return {string}
 */
var maximumOddBinaryNumber = function (s) {
  let cnt1 = 0;
  for (let x of s) {
    if (x == '1') cnt1++;
  }
  return '1'.repeat(cnt1 - 1) + '0'.repeat(s.length - cnt1) + '1';
};

/**
 * @param {number} num
 * @return {number}
 */
var minMaxDifference = function (num) {
  let s = num.toString();
  let i = 0;
  let first = s[i];
  while (first == '9' && i < s.length) {
    first = s[i++];
  }
  // console.log(first, i)
  // 如果第一个数是9 就找下一个非9的数字
  let max = BigInt(s.replaceAll(first, '9'));
  // 不管大小  都是把第一个数替换成0
  let min = BigInt(s.replaceAll(s[0], '0'));
  // console.log(max, min);
  return Number(max - min);
};

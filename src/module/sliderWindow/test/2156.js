/**
 * @param {string} s
 * @param {number} power
 * @param {number} modulo
 * @param {number} k
 * @param {number} hashValue
 * @return {string}
 */
var innerVal = (c) => {
  return c.charCodeAt() - 'a'.charCodeAt() + 1;
};
var subStrHash = function (s, power, modulo, k, hashValue) {
  let winVal = 0;
  const n = s.length;
  for (let left = 0, right = 0; right < n; right++) {
    while (right - left + 1 > p) {
      // 这是一个定长的
      winVal -= innerVal(s[left]) * Math.pow(power, 0);
      left++;
    }
    // 现在窗口里面有多少个
    winVal += innerVal(s[right]) * Math.pow(power, right - left);
  }
};

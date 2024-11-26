/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function (word) {
  const bitLen = (n) => {
    let count = 0;
    while (n) {
      n &= n - 1;
      count++;
    }
    return count;
  };
  let mask = [0, 0];
  for (let c of word) {
    // 大写字母第5位一定是0  小写字母第5位一定是0
    mask[(c.charCodeAt() >> 5) & 1] |= 1 << (c.charCodeAt() & 31);
  }
  return bitLen(mask[0] & mask[1]);
};

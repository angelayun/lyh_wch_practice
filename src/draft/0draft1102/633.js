/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
  const n = Math.ceil(Math.sqrt(c));
  for (let i = 1; i * i <= c; i++) {
    for (let j = 1; j * j <= c; j++) {
      let cur = i * i + j * j;
      if (cur > c) break;
      if (i * i + j * j == c) {
        return true;
      }
    }
  }
  return false;
};

// 第一想法没有想到双指针 哎
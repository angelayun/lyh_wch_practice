/**
 * @param {number} bottom
 * @param {number} top
 * @param {number[]} special
 * @return {number}
 */
var maxConsecutive = function (bottom, top, special) {
  special.sort((a, b) => a - b);
  let j = 0;
  let maxCnt = 0;
  let cnt = 0;
  for (let i = bottom; i <= top; i++) {
    if (i == special[j]) {
      cnt = 0;
      j++;
    } else {
      cnt++;
    }
    maxCnt = Math.max(maxCnt, cnt);
  }
  return maxCnt;
};
// 上面这种会超时

/**
 * @param {number} bottom
 * @param {number} top
 * @param {number[]} special
 * @return {number}
 */
var maxConsecutive = function (bottom, top, special) {
  special.sort((a, b) => a - b);
  let maxCnt = 0;
  for (let i = 1; i < special.length; i++) {
    maxCnt = Math.max(maxCnt, special[i] - special[i - 1]);
  }
  return Math.max(
    maxCnt,
    special[0] - bottom,
    top - special[special.length - 1]
  );
};

/**
 * @param {number[]} hours
 * @return {number}
 */
var longestWPI = function (hours) {
  let cnt = new Map([[0, -1]]);
  let preSum = 0;
  let res = 0;
  for (let i = 0; i < hours.length; i++) {
    let h = hours[i];
    preSum += h > 8 ? 1 : -1;
    if (cnt.has(preSum)) {
      res = Math.max(res, i - cnt.get(preSum));
    } else {
      cnt.set(preSum, i);
    }
  }
  return res;
};
// TODO 上面这个题目没理解  这个答案过不了
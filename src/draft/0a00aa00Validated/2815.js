/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSum = function (nums) {
  let res = -1;
  let cnt = new Array(10).fill(0);
  for (let x of nums) {
    let maxBit = 0;
    let y = x;
    while (y) {
      maxBit = Math.max(maxBit, y % 10);
      y = ~~(y / 10);
    }
    if (cnt[maxBit]) {
      res = Math.max(res, cnt[maxBit] + x);
    }
    cnt[maxBit] = Math.max(cnt[maxBit] || 0, x);
  }
  return res;
};

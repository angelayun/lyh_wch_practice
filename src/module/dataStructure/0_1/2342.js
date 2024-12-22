/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumSum = function (nums) {
  let cnt = new Array(82).fill(-Infinity);
  let res = -1;
  for (let x of nums) {
    let sum = 0;
    for (let y = x; y; y = ~~(y / 10)) {
      sum += y % 10;
    }
    res = Math.max(res, x + cnt[sum]);
    cnt[sum] = Math.max(cnt[sum], x);
  }
  return res;
};
// 下面是初始值为0的区别
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumSum = function (nums) {
  let cnt = new Array(82).fill(0);
  let res = -1;
  for (let x of nums) {
    let sum = 0;
    for (let y = x; y; y = ~~(y / 10)) {
      sum += y % 10;
    }
    if (cnt[sum]) {
      res = Math.max(res, x + cnt[sum]);
    }
    cnt[sum] = Math.max(cnt[sum], x);
  }
  return res;
};

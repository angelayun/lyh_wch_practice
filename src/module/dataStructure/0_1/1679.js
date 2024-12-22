/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  let cnt = new Map();
  let res = 0;
  for (let x of nums) {
    if (cnt.has(k - x)) {
      res++;
      cnt.set(k - x, cnt.get(k - x) - 1);
      if (cnt.get(k - x) == 0) cnt.delete(k - x);
    } else {
      cnt.set(x, (cnt.get(x) || 0) + 1);
    }
  }
  return res;
};
// 下面是灵神简洁的写法
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  let cnt = new Map();
  let res = 0;
  for (let x of nums) {
    let c = cnt.get(k - x);
    if (c) {
      res++;
      cnt.set(k - x, c - 1);
    } else {
      cnt.set(x, (cnt.get(x) || 0) + 1);
    }
  }
  return res;
};

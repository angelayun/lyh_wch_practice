/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSum = function (nums) {
  let cnt = new Array(11).fill(0);
  let res = -1;
  for (let x of nums) {
    let num = x;
    let maxBit = num % 10;
    while (num) {
      maxBit = Math.max(maxBit, num % 10);
      num = ~~(num / 10);
    }
    if (cnt[maxBit]) {
      res = Math.max(res, cnt[maxBit] + num);
      if (cnt[maxBit] < num) {
        cnt[maxBit] = num;
      }
    } else {
      cnt[maxBit] = num;
    }
  }
  return res;
};

// 下面是灵神非常简洁的写法，但是没搞清楚为什么初始值要是-Infinity
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSum = function (nums) {
  let cnt = new Array(11).fill(-Infinity);
  let res = -1;
  for (let x of nums) {
    let num = x;
    let maxBit = 0;
    while (num) {
      maxBit = Math.max(maxBit, num % 10);
      num = ~~(num / 10);
    }
    res = Math.max(res, cnt[maxBit] + x);
    cnt[maxBit] = Math.max(cnt[maxBit], x);
    /* if (cnt[maxBit]) {
      res = Math.max(res, cnt[maxBit] + x);
      if (cnt[maxBit] < x) {
        cnt[maxBit] = x;
      }
    } else {
      cnt[maxBit] = x;
    } */
  }
  return res;
};
// 如果要写成初始值为0的话  要写成下面这样子
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSum = function (nums) {
  let cnt = new Array(11).fill(0);
  let res = -1;
  for (let x of nums) {
    let num = x;
    let maxBit = 0;
    while (num) {
      maxBit = Math.max(maxBit, num % 10);
      num = ~~(num / 10);
    }
    if (cnt[maxBit]) {
      res = Math.max(res, cnt[maxBit] + x);
    }
    cnt[maxBit] = Math.max(cnt[maxBit], x);
    /* if (cnt[maxBit]) {
      res = Math.max(res, cnt[maxBit] + x);
      if (cnt[maxBit] < x) {
        cnt[maxBit] = x;
      }
    } else {
      cnt[maxBit] = x;
    } */
  }
  return res;
};

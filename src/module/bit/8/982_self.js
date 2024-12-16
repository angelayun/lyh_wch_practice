/**
 * @param {number[]} nums
 * @return {number}
 */
var countTriplets = function (nums) {
  let cnt = new Array(1 << 16).fill(0);
  for (let x of nums) {
    for (let y of nums) {
      cnt[x & y]++;
    }
  }
  // 本质上这个是一个三重暴力的解法  只是用空间换时间而已
  let res = 0;
  for (let x of nums) {
    for (let i = 0; i < 1 << 16; i++) {
      if ((x & i) == 0) {
        res += cnt[i];
      }
    }
  }
  return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var countTriplets = function (nums) {
  let cnt = new Array(1 << 16).fill(0);
  for (let x of nums) {
    for (let y of nums) {
      cnt[x & y]++;
    }
  }
  let mask = 0xffffffff;
  let res = 0;
  for (let x of nums) {
    // 相当于x的补集
    let m = mask ^ x;
    let s = m;
    while (true) {
      res += cnt[s];
      // 去掉最低位的1   一位一位的去掉1
      s = (s - 1) & m;
      if (s == m) break;
    }
  }
  return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSum = function (nums) {
  let cnt = new Array(10).fill(0);
  let ans = -1;
  for (let x of nums) {
    let maxBit = 0;
    let copy = x;
    while (copy) {
      maxBit = Math.max(maxBit, copy % 10);
      copy = ~~(copy / 10);
    }
    if (cnt[maxBit] != 0) {
      ans = Math.max(ans, x + cnt[maxBit]);
    }
    cnt[maxBit] = Math.max(cnt[maxBit], x);
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSum = function (nums) {
  let cnt = new Array(10).fill(Number.MIN_SAFE_INTEGER);
  let ans = -1;
  for (let x of nums) {
    let maxBit = 0;
    let copy = x;
    while (copy) {
      maxBit = Math.max(maxBit, copy % 10);
      copy = ~~(copy / 10);
    }
    ans = Math.max(ans, x + cnt[maxBit]);
    cnt[maxBit] = Math.max(cnt[maxBit], x);
  }
  return ans;
};

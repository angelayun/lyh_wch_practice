/**
 * @param {number} n
 * @param {number} start
 * @return {number[]}
 */
var circularPermutation = function (n, start) {
  let res = [start];
  let set = new Set();
  set.add(start);
  for (let i = 1; i < 1 << n; i++) {
    for (let bit = 0; bit < 32; bit++) {
      let cur = res[i - 1];
      // 当前这一位要变成的数字  1变成0  0变成1
      let changeVal = ((cur >> bit) & 1) ^ 1;
      // 把当前这一位上的值去掉
      cur = cur ^ (1 << bit);
      cur |= changeVal << bit;
      if (!set.has(cur)) {
        set.add(cur);
        res[i] = cur;
        break;
      }
    }
  }
  return res;
};
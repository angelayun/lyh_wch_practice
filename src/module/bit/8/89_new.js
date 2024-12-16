/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  let res = [0];
  let set = new Set();
  set.add(0);
  for (let i = 2; i < 1 << n; i++) {
    for (let bit = 0; bit < 32; bit++) {
      let cur = res[i - 1];
      // 当前这一位要变成的数字  1变成0  0变成1
      let changeVal = ((cur >> bit) & 1) ^ 1;
      // 把当前这一位上的值去掉
      cur = cur ^ (1 << bit);
      // 新的值加上
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
// 过了 在之前的基础上进行了优化
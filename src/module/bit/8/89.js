/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  let res = new Array(Math.pow(2, n)).fill(0);
  res[1] = 1;
  let set = new Set();
  set.add(0);
  set.add(1);
  for (let i = 2; i < res.length; i++) {
    let bit = 0;
    let prev = res[i - 1];
    let cur = prev;
    while (true) {
      // 当前这一位要变成的数字  1变成0  0变成1
      let changeVal = ((prev >> bit) & 1) ^ 1;
      // 把当前这一位上的值去掉  删除元素（一定在集合中）
      // cur = cur ^ (1 << bit);
      // 把当前这一位上的值去掉 （删除元素）
      cur = cur & ~(1 << bit);
      cur |= changeVal << bit;
      if (!set.has(cur)) {
        set.add(cur);
        res[i] = cur;
        break;
      } else {
        bit++;
        cur = prev;
      }
    }
  }
  return res;
};

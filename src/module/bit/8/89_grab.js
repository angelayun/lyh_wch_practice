/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  let set = new Set();
  set.add(0);
  let res = [0];
  for (let i = 1; i < 1 << n; i++) {
    let pre = res[res.length - 1];
    let cur = pre;
    for (let j = 0; j < 32; j++) {
      // 第j位是0还是1
      let bit = ((pre >> j) & 1) ^ 1;
      cur ^= bit << j;
      cur |= bit << j;
      if (!set.has(cur)) {
        res.push(cur);
        set.add(cur);
        break;
      }
    }
  }
  return res;
};
// TODO  不知道哪里错了

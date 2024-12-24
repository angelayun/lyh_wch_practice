/**
 * @param {number[]} nums
 * @return {number}
 */
var getLargestOutlier = function (nums) {
  // x+2y=total  x是要求的异常值
  let total = 0;

  let cnt = new Map();
  for (let x of nums) {
    total += x;
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  let res = Number.MIN_SAFE_INTEGER;
  for (let y of nums) {
    // [2,3,5,10] 以这个举例 当遍历到y=5的时候 20-5*2 = 10 所以找到了一个解
    cnt.set(y, cnt.get(y) - 1);
    let x = total - 2 * y;
    if (cnt.get(x)) {
      res = Math.max(x, res);
    }
    // 这里有点回溯的意味在里面
    cnt.set(y, cnt.get(y) + 1);
  }
  // 输入保证 nums 中至少存在 一个 可能的异常值。  所以直接返回
  return res;
};

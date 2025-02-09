/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function (nums, k, numOperations) {
  let cnt = new Map();
  let diff = new Map();
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
    // 把 x 插入 diff，以保证下面能遍历到 x
    // if (!diff.has(x)) diff.set(x, 0);
    diff.set(x, (diff.get(x) || 0) + 0);

    // 把 [x-k, x+k] 中的每个整数的出现次数都加一
    diff.set(x - k, (diff.get(x - k) || 0) + 1);
    diff.set(x + k + 1, (diff.get(x + k + 1) || 0) - 1);
  }
  // console.log(diff, cnt)
  let ans = 0;
  let sumD = 0;
  let keys = Array.from(diff.keys());
  keys.sort((a, b) => a - b);
  for (let x of keys) {
    let d = diff.get(x);
    sumD += d;
    // console.log(sumD, cnt.get(x))
    ans = Math.max(ans, Math.min(sumD, cnt.get(x) ?? 0 + numOperations));
  }
  // console.log(ans)
  return ans;
  // return ans;
};

// TODO 这俩 还有点问题  晚点再看一下
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function (nums, k, numOperations) {
  let cnt = new Map();
  let diff = new Map();
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
    // 把 x 插入 diff，以保证下面能遍历到 x
    if (!diff.has(x)) diff.set(x, 0);
    // 把 [x-k, x+k] 中的每个整数的出现次数都加一
    diff.set(x - k, (diff.get(x - k) || 0) + 1);
    diff.set(x + k + 1, (diff.get(x + k + 1) || 0) - 1);
  }
  // console.log(diff, cnt)
  let ans = 0;
  let sumD = 0;
  let vals = Array.from(diff.values());
  vals.sort((a, b) => a - b);
  for (let d of vals) {
    let x = diff.get(d);
    sumD += d;
    // console.log(sumD, cnt.get(x))
    ans = Math.max(ans, Math.min(sumD, cnt.get(x) ?? 0 + numOperations));
  }
  // console.log(ans)
  return ans;
  // return ans;
};

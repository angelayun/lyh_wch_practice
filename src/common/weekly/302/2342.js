/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumSum = function (nums) {
  // key是数位和  value是nums[i]
  let cnt = new Map();
  let ans = -1;
  for (let x of nums) {
    let y = x;
    let sum = 0;
    while (y) {
      sum += y % 10;
      y = ~~(y / 10);
    }
    // console.log(x, sum);
    if (cnt.has(sum)) {
      ans = Math.max(ans, x + cnt.get(sum));
      if (x > cnt.get(sum)) {
        cnt.set(sum, x);
      }
    } else {
      cnt.set(sum, x);
    }
  }
  return ans;
};

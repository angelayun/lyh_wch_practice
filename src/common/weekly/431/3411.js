// gcd 和 lcm 的模板写法
const gcd = (a, b) => {
  while (b != 0) {
    [a, b] = [b, a % b];
  }
  return a;
};
const lcm = (a, b) => {
  return ~~(a / gcd(a, b)) * b;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxLength = function (nums) {
  let allLcm = 1;
  let max = Number.MIN_SAFE_INTEGER;
  for (let x of nums) {
    allLcm = lcm(allLcm, x);
    max = Math.max(max, x);
  }
  let ans = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < nums.length; i++) {
    let m = 1,
      l = 1,
      g = 0;
    for (let j = i; j < nums.length && m <= allLcm * max; j++) {
      x = nums[j];
      m *= x;
      l = lcm(l, x);
      g = gcd(g, x);
      if (m === l * g) {
        ans = Math.max(ans, j - i + 1);
      }
    }
  }
  return ans;
};

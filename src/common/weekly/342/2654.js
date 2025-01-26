// gcd模板
const gcd = (a, b) => {
  while (b != 0) {
    [a, b] = [b, a % b];
  }
  return a;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  let n = nums.length;
  let gcdAll = 0,
    cnt1 = 0;
  for (let x of nums) {
    gcdAll = gcd(gcdAll, x);
    if (x == 1) cnt1++;
  }
  if (gcdAll > 1) return -1;
  if (cnt1 > 0) return n - cnt1;
  let minSize = n;
  for (let i = 0; i < n; i++) {
    let g = 0;
    for (let j = i; j < n; j++) {
      g = gcd(g, nums[j]);
      if (g == 1) {
        minSize = Math.min(minSize, j - i + 1);
        break;
      }
    }
  }
  return minSize + n - 2;
};

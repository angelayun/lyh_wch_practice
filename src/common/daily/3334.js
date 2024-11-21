const gcd = (a, b) => {
  while (b != 0) {
    [a, b] = [b, a % b];
  }
  return a;
};
const lcm = (a, b) => (a / gcd(a, b)) * b;
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxScore = function (nums) {
  let n = nums.length;
  let sufGcd = new Array(n + 1).fill(0);
  let sufLcm = new Array(n + 1).fill(0n);
  sufLcm[n] = 1;
  for (let i = n - 1; i >= 0; i--) {
    sufGcd[i] = gcd(sufGcd[i + 1], nums[i]);
    sufLcm[i] = lcm(sufLcm[i + 1], nums[i]);
  }

  let ans = sufGcd[0] * sufLcm[0]; // 不移除元素
  let preGcd = 0;
  let preLcm = 1;
  for (let i = 0; i < n; i++) {
    // 枚举移除 nums[i]
    ans = Math.max(
      ans,
      gcd(preGcd, sufGcd[i + 1]) * lcm(preLcm, sufLcm[i + 1])
    );
    preGcd = gcd(preGcd, nums[i]);
    preLcm = lcm(preLcm, nums[i]);
  }
  return ans;
};

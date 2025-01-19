/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfSubsequences = function (nums) {
  const n = nums.length;
  // a * c == b * d
  // a / b == d / c;
  let cnt = new Map();
  let ans = 0;
  for (let i = 4; i < n - 2; i++) {
    let c = nums[i];
    let b = nums[i - 2];
    for (let k = 0; k < i - 3; k++) {
      let a = nums[k];
      cnt.set(a / b, (cnt.get(a / b) || 0) + 1);
    }
    for (let p = i + 2; p < n; p++) {
      let d = nums[p];
      let y = d / c;
      ans += cnt.get(y) ?? 0;
    }
  }
  return ans;
};
// 自己写的，以c为端点枚举，b其实就能算出来，那么枚举a就可以了 维护左  然后枚举右 获得值

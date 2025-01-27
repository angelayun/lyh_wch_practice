/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfSubsequences = function (nums) {
  // a*c= b*d
  // a/b=d/c
  const n = nums.length;
  let ans = 0;
  let cnt = new Map();
  for (let i = 4; i < n - 2; i++) {
    let c = nums[i];
    let b = nums[i - 2];
    for (let j = 0; j < i - 3; j++) {
      let a = nums[j];
      cnt.set(a / b, (cnt.get(a / b) || 0) + 1);
    }
    for (let k = i + 2; k < n; k++) {
      let d = nums[k];
      let curKey = d / c;
      ans += cnt.get(curKey) ?? 0;
    }
  }
  return ans;
};

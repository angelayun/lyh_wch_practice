/**
 * @param {number[]} nums
 * @return {number}
 */
var countNicePairs = function (nums) {
  // 存nums[i]-rev(nums[i])
  const n = nums.length;
  let cnt = new Map();
  const MOD = Math.pow(10, 9) + 7;
  let res = 0;
  for (let i = 0; i < n; i++) {
    let rev = 0;
    for (let j = nums[i]; j; j = ~~(j / 10)) {
      rev *= 10;
      rev += j % 10;
    }
    console.log(nums[i], rev)
    let cur = nums[i] - rev;
    res += cnt.get(cur) || 0;
    res %= MOD;
    cnt.set(cur, (cnt.get(cur) || 0) + 1);
  }
  return res;
};

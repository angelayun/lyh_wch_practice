/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfSubsequences = function (nums) {
  let n = nums.length;
  let ans = 0n;
  // Map<Float, Integer> cnt = new HashMap<>();
  let cnt = new Map();
  for (let i = 0; i < n; i++) {
    nums[i] = BigInt(nums[i]);
  }
  // 枚举 b 和 c
  for (let i = 4; i < n - 2; i++) {
    // 增量式更新，本轮循环只需枚举 b=nums[i-2] 这一个数
    // 至于更前面的 b，已经在前面的循环中添加到 cnt 中了，不能重复添加
    let b = nums[i - 2];
    // 枚举 a
    for (let j = 0; j < i - 3; j++) {
      // cnt.merge(nums[j] / b, 1, Integer::sum);
      // cnt[nums[j] / b]++;
      let cur = nums[j] / b;
      cnt.set(cur, (cnt.get(cur) || 0) + 1);
    }

    let c = nums[i];
    // 枚举 d
    for (let j = i + 2; j < n; j++) {
      // ans += cnt.getOrDefault(nums[j] / c, 0);
      ans += BigInt(cnt.get(nums[j] / c) ?? 0);
    }
  }
  return Number(ans);
};
// TODO 这个题目js过不了  有精度问题

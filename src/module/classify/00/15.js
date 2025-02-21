var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const ans = [];
  for (let i = 0; i < n - 2; i++) {
    const x = nums[i];
    if (i > 0 && x === nums[i - 1]) continue; // 跳过重复数字
    // 当前数与最小的俩数相加都要大于0 那么当前数与任何数相加都大于0  没有循环的必要的
    if (x + nums[i + 1] + nums[i + 2] > 0) break; // 优化一
    // 当前数与最大的俩数相加都要小于0 只能看下一个数了
    if (x + nums[n - 2] + nums[n - 1] < 0) continue; // 优化二
    let j = i + 1, k = n - 1;
    while (j < k) {
      const s = x + nums[j] + nums[k];
      if (s > 0) {
        k--;
      } else if (s < 0) {
        j++;
      } else {
        ans.push([x, nums[j], nums[k]]);
        for (j++; j < k && nums[j] === nums[j - 1]; j++); // 跳过重复数字
        for (k--; k > j && nums[k] === nums[k + 1]; k--); // 跳过重复数字
      }
    }
  }
  return ans;
};
var triangleNumber = function (nums) {
  nums.sort((a, b) => a - b);
  let ans = 0;
  for (let k = nums.length - 1; k > 1; k--) {
    const c = nums[k];
    if (nums[0] + nums[1] > c) {
      // 优化一
      // 从 nums[0] 到 nums[k] 中任选三个数 a,b,c 都满足 a+b>c
      // 那就相当于从k+1个元素中选择任意3个数都是可以的
      ans += ((k + 1) * k * (k - 1)) / 6;
      break;
    }
    // 最大的a+b 都要小于c 只能看下一轮了
    if (nums[k - 2] + nums[k - 1] <= c) {
      // 优化二
      continue;
    }
    let i = 0; // a=nums[i]
    let j = k - 1; // b=nums[j]
    while (i < j) {
      if (nums[i] + nums[j] > c) {
        ans += j - i;
        j--;
      } else {
        i++;
      }
    }
  }
  return ans;
};

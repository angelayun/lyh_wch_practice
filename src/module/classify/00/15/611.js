var triangleNumber = function (nums) {
  nums.sort((a, b) => a - b);
  let ans = 0;
  for (let k = 2; k < nums.length; k++) {
    const c = nums[k];
    let i = 0; // a=nums[i]
    let j = k - 1; // b=nums[j]
    while (i < j) {
      if (nums[i] + nums[j] > c) {
        // 由于 nums 已经从小到大排序
        // nums[i]+nums[j] > c 同时意味着：
        // nums[i+1]+nums[j] > c
        // nums[i+2]+nums[j] > c
        // ...
        // nums[j-1]+nums[j] > c
        // 从 i 到 j-1 一共 j-i 个
        ans += j - i;
        j--;
      } else {
        // 由于 nums 已经从小到大排序
        // nums[i]+nums[j] <= c 同时意味着
        // nums[i]+nums[j-1] <= c
        // ...
        // nums[i]+nums[i+1] <= c
        // 所以在后续的内层循环中，nums[i] 不可能作为三角形的边长，没有用了
        i++;
      }
    }
  }
  return ans;
};


var triangleNumber = function (nums) {
  nums.sort((a, b) => a - b);
  let ans = 0;
  for (let k = nums.length - 1; k > 1; k--) {
    const c = nums[k];
    if (nums[0] + nums[1] > c) { // 优化一
      // 从 nums[0] 到 nums[k] 中任选三个数 a,b,c 都满足 a+b>c
      // 那就相当于从k+1个元素中选择任意3个数都是可以的   
      ans += (k + 1) * k * (k - 1) / 6;
      break;
    }
    // 最大的a+b 都要小于c 只能看下一轮了
    if (nums[k - 2] + nums[k - 1] <= c) { // 优化二
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
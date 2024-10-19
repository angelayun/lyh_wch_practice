// 两种解题的方式
var subsets = function (nums) {
  const n = nums.length;
  const ans = []
  const path = []
  function dfs(i) {
    if (i === n) { // 子集构造完毕
      ans.push(path.slice()); // 复制 path
      return;
    }

    // 不选 nums[i]
    dfs(i + 1);

    // 选 nums[i]
    path.push(nums[i]);
    dfs(i + 1);
    path.pop(); // 恢复现场
  }
  dfs(0);
  return ans;
};


var subsets = function (nums) {
  const n = nums.length;
  const ans = []
  const path = []
  function dfs(i) {
    ans.push(path.slice()); // 复制 path
    for (let j = i; j < n; j++) { // 枚举选择的数字
      path.push(nums[j]);
      dfs(j + 1);
      path.pop(); // 恢复现场
    }
  }
  dfs(0);
  return ans;
};

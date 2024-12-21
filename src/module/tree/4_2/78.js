var subsets = function (nums) {
  const n = nums.length;
  let res = [];
  let path = [];
  const dfs = (i) => {
    if (i == n) {
      res.push(path.slice());
      return;
    }
    // 不选当前元素
    dfs(i + 1);
    // 选当前元素
    path.push(nums[i]);
    dfs(i + 1);
    path.pop();
  };
  dfs(0);
  return res;
};
// 索引的方式
var subsets = function (nums) {
  const n = nums.length;
  let res = [];
  let path = [];
  // 其实可以把这个i理解为双重循环的left端点
  const dfs = (i) => {
    res.push(path);
    for (let index = i; index < n; index++) {
      path.push(nums[index]);
      dfs(index + 1);
      path.pop();
    }
  };
  dfs(0);
  return res;
};

// 下面是灵神的二进制位位数的一种方式
var subsets = function (nums) {
  const n = nums.length;
  const ans = [];
  for (let i = 0; i < 1 << n; i++) {
    // 枚举全集 U 的所有子集 i
    const subset = [];
    for (let j = 0; j < n; j++) {
      if ((i >> j) & 1) {
        // j 在集合 i 中
        subset.push(nums[j]);
      }
    }
    ans.push(subset);
  }
  return ans;
};

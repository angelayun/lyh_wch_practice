/**
 * @param {number[]} nums
 * @return {number}
 */
var countMaxOrSubsets = function (nums) {
  let all = 0;
  let ans = 0;
  // 整个数组最大的或值
  for (let x of nums) all |= x;
  //开一个大小为 2^n 的 or Array
  //因为对于一个有 n 个元素的nums数组，总共只有 2 ^ n 个子集组合数（n个元素，每个元素都只有选和不选的状态）
  let or = new Array(nums.length << 1).fill(0);
  for (let [i, v] of nums.entries()) {
    // k 代表 目前外层回溯枚举的这个元素所形成的子集中，只有 自己 这么一个元素而已
    for (let j = 0, k = 1 << i; j < k; j++) {
      //内层开始把 比当前子集更小的组合 加入到当前外层的子集
      //每个 j ，都是一个子集的组合
      //为什么只遍历到 k 而已？
      //是因为我们只需要遍历 前 i 个元素的所生成的子集组合而已（这些旧的组合 加上 K 就会形成新的子集组合）
      let res = or[j] | v;
      or[k | j] = res;
      if (res == all) {
        ans++;
      }
    }
  }
  return ans;
};

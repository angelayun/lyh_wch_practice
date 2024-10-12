/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallestSubarrays = function (nums) {
  const n = nums.length;
  let ans = new Array(n).fill(0);
  let ors = []; // 按位或的值 + 对应子数组的右端点的最小值
  for (let right = n - 1; right >= 0; right--) {
    ors.push([0, right]);
    // 以i为右端点
    let k = 0; // k是ors的索引
    for (let or of ors) {
      or[0] |= nums[right];
      if (ors[k][0] == or[0]) {
        ors[k][1] = or[1]; // 合并相同值  下标取最小的
      } else ors[++k] = or;
    }
    console.log('没合并之前的or', ors)
    // 从k+1位置开始，
    ors.splice(k + 1, ors.length - k);
    console.log('合并之后的or', ors)

    ans[right] = ors[0][1] - right + 1;
  }
  return ans;
};

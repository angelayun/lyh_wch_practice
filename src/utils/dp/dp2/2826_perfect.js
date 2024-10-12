/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  const n = nums.length
  // 考虑前i个数  第i个是j
  let f = Array.from({ length: n + 1 }, () => new Array(4).fill(0))
  for (let i = 0; i < n; i++) {
    let x = nums[i]
    for (let j = 1; j < 4; j++) {
      f[i + 1][j] = Infinity
      // 从比j小的状态转移过来
      for (let k = 1; k < j + 1; k++) {
        f[i + 1][j] = Math.min(f[i + 1][j], f[i][k])
      }
      // 如果x和j不一致
      f[i + 1][j] += x != j ? 1 : 0
    }
  }
  let ans = n
  for (let j = 1; j < 4; j++) {
    console.log(f[n][j])
    ans = Math.min(ans, f[n][j]);
  }
  return ans
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  // 下面是空间优化的写法
  const n = nums.length
  // 考虑前i个数  第i个是j
  let f = new Array(4).fill(0)
  for (let x of nums) {
    for (let j = 3; j > 0; j--) {
      for (let k = j; k < j + 1; k++) {
        f[j] = Math.min(f[k], f[j])
      }
      f[j] += x != j ? 1 : 0
    }
  }
  console.log(f)
  let ans = n
  for (let j = 1; j < 4; j++) {
    ans = Math.min(ans, f[j]);
  }
  return ans
};
// TODO 这个空间优化的写法没对，暂时不清楚啥原因
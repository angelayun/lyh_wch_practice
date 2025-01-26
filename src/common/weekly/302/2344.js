// gcd模板
const gcd = (a, b) => {
  while (b != 0) {
    [a, b] = [b, a % b];
  }
  return a;
};
/**
 * @param {number[]} nums
 * @param {number[]} numsDivide
 * @return {number}
 */
var minOperations = function (nums, numsDivide) {
  // 先求出numsDivide的gcd
  let g = 0;
  for (let x of numsDivide) {
    g = gcd(g, x);
  }
  // 从小到大排序
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    // 当前是最小元素  前面的元素都是可以删除  元素的元素个数是i
    if (g % nums[i] == 0) return i;
  }
  return -1;
};
// 上面是排序的方式   如果不用排序  两次遍历也可解决
// gcd模板
const gcd = (a, b) => {
  while (b != 0) {
    [a, b] = [b, a % b];
  }
  return a;
};
var minOperations = function (nums, numsDivide) {
  // 先求出numsDivide的gcd
  let g = 0;
  for (let x of numsDivide) {
    g = gcd(g, x);
  }
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < nums.length; i++) {
    if (g % nums[i] == 0) min = Math.min(min, nums[i]);
  }
  // 没有找到
  if (min == Number.MAX_SAFE_INTEGER) return -1;
  let cnt = 0;
  for (let x of nums) {
    if (x < min) cnt++;
  }
  return cnt;
};
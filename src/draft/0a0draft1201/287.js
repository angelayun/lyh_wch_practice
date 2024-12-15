/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let xor = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    xor ^= nums[i] ^ (i + 1);
  }
  xor ^= n;
  return xor;
};
// 题目并没有说明nums中的数字都在 [1, n] 范围内并且每个数字都存在  所以上面的思路过不去 通不过
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  const n = nums.length;
  let realIndex;
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    realIndex = x - 1;
    while (x != nums[realIndex]) {
      [nums[i], nums[realIndex]] = [nums[realIndex], nums[i]];
      x = nums[i];
      realIndex = x - 1;
    }
  }
  console.log(nums);
  for (let i = 0; i < n; i++) {
    if (nums[i] != i + 1) {
      return nums[i];
    }
  }
};

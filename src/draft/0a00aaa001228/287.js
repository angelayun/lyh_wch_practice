/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  const n = nums.length;
  let xor = 0;
  for (let i = 0; i < n; i++) {
    console.log(nums[i], i + 1);
    xor ^= nums[i] ^ (i + 1);
  }
  xor ^= n;
  console.log('------', n);
  return xor;
};
// 上面这个想做思路了  哎呀呀
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let realIndex = nums[i] - 1;
    while ( nums[realIndex] != nums[i]) {
      [nums[realIndex], nums[i]] = [nums[i], nums[realIndex]];
      realIndex = nums[i] - 1;
    }
  }
  for (let i = 0; i < n; i++){
    if (nums[i] - 1 != i) {
      return nums[i]
    }
  }
};

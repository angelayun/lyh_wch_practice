/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  // 先都放到有序的位置上
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    // x应该放在x-1的位置上
    let x = nums[i];
    let realIndex = x - 1;
    // 如果x 没有放在x-1的位置上  交换再看是不是对的位置  不对继续比较  这一轮之后应该都放在了正确的位置上
    while (x > 0 && x < n + 1 && x != nums[realIndex]) {
      [nums[i], nums[realIndex]] = [nums[realIndex], nums[i]];
      x = nums[i];
      realIndex = x - 1;
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] != i + 1) return nums[i];
  }
};

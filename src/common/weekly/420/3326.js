const MX = 1_000_001;
// 由于 1 不比其他数大，所以无需初始化 LPF(1)=1
let LPF = new Array(MX).fill(0);
for (let i = 2; i < MX; i++) {
  if (LPF[i] == 0) {
    for (let j = i; j < MX; j += i) {
      if (LPF[j] == 0) {
        LPF[j] = i;
      }
    }
  }
}
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  let ans = 0;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] > nums[i + 1]) {
      nums[i] = LPF[nums[i]];
      if (nums[i] > nums[i + 1]) return -1;
      ans += 1;
    }
  }
  return ans;
};

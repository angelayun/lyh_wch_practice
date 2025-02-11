const MX = 1e5 + 1;
let LPF = new Array(MX).fill(0);
for (let i = 2; i < MX; i++) {
  if (LPF[i] == 0) {
    for (let j = i; j < MX; j += i) {
      if (LPF[j] != 0) {
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
  const n = nums.length;
  let cnt = 0;
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] > nums[i + 1]) {
      nums[i] = LPF[nums[i]];
      if (nums[i] > nums[i + 1]) return -1;
      cnt++;
    }
  }
  return cnt;
};

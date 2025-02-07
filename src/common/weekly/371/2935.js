/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumStrongPairXor = function (nums) {
  nums.sort((a, b) => a - b);
  let highBit = 31 - Math.clz32(nums[nums.length - 1]);
  let ans = 0;
  let mask = 0;
  let mp = new Map();
  for (let i = highBit; i >= 0; i--) {
    mp.clear();
    mask |= 1 << i;
    let newAns = ans | (1 << i);
    for (let y of nums) {
      let maskY = y & mask;
      if (mp.has(newAns ^ maskY) && mp.get(newAns ^ maskY) * 2 >= y) {
        ans = newAns;
        break;
      }
    }
    mp.set(maskY, y);
  }
  return ans;
};

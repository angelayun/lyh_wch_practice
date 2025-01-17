/**
 * @param {number[]} nums
 * @return {number}
 */
var maxGoodNumber = function (nums) {
  let arr = [nums[0], nums[1], nums[2]];
  arr.sort((a, b) => {
    let lenA = 32 - Math.clz32(a);
    let lenB = 32 - Math.clz32(b);
    return ((b << lenA) | a) - ((a << lenB) | b);
  });
  let ans = 0;
  for (let x of arr) {
    let lenX = 32 - Math.clz32(x);
    ans = (ans << lenX) | x;
  }
  return ans;
};

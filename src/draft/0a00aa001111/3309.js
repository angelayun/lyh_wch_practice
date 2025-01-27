/**
 * @param {number[]} nums
 * @return {number}
 */
var maxGoodNumber = function (nums) {
  nums.sort((a, b) => {
    let lenA = 32 - Math.clz32(a),
      lenB = 32 - Math.clz32(b);
    return ((1 << lenB) | a) - ((1 << lenA) - b);
  });
  let ans = 0;
  for (let x of nums) {
    let len = 32 - Math.clz32(ans);
    ans = (1 << len) | x;
  }
  return ans;
};

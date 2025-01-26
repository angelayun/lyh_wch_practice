/**
 * @param {number[]} nums
 * @param {number[]} target
 * @return {number}
 */
var makeSimilar = function (nums, target) {
  const handle = (a) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] % 2 != 0) a[i] = -a[i];
    }
    a.sort((a, b) => a - b);
  };
  handle(nums);
  handle(target);
  let ans = 0n;
  for (let i = 0; i < nums.length; i++) {
    ans += BigInt(Math.abs(nums[i] - target[i]));
  }
  return Number(ans >> 2n);
};

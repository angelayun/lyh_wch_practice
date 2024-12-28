/**
 * @param {number[]} nums
 * @return {number}
 */
var sumDigitDifferences = function (nums) {
  let ans = 0;
  while (nums[0] > 0) {
    let cnt = new Array(10).fill(0);
    for (let j = 0; j < nums.length; j++) {
      let x = nums[j];
      let y = x % 10;
      for (let i = 0; i < 10; i++) {
        if (i != y) {
          ans += cnt[i];
        }
      }
      cnt[y]++;
      nums[j] = ~~(x / 10);
    }
  }
  return ans;
};

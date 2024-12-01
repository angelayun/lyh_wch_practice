/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canAliceWin = function (nums) {
  let oneSum = 0,
    twoSum = 0;
  let totalSum = 0;
  for (let x of nums) {
    if (~~(x / 100) < 0 && ~~(x / 10) > 0) {
      console.log('两位数', x);
      twoSum += x;
    } else if (~~(x / 10) < 0) {
      console.log('个位数', x);
      oneSum += x;
    }
    totalSum += x;
  }
  return twoSum > totalSum - twoSum || oneSum > totalSum - oneSum;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumArrayLength = function (nums) {
  let min = Math.min(...nums);
  for (let x of nums) {
    if (x % min) return 1;
  }
  let countM = 0;
  for (let x of nums) {
    if (x == min) countM++;
  }
  // 这个其实是上取整
  return (countM + 1) >> 1;
};

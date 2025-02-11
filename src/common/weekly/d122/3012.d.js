/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumArrayLength = function (nums) {
  const min = Math.min(...nums);
  let cnt = 0;
  for (let x of nums) {
    if (x % min) return 1;
    if (x == min) cnt++;
  }
  return Math.ceil(cnt / 2);
};

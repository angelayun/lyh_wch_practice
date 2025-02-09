/**
 * @param {number[]} nums
 * @return {number}
 */
var minElement = function (nums) {
  let minVal = Number.MAX_SAFE_INTEGER;
  const getSum = (x) => {
    let sum = 0;
    while (x) {
      sum += x % 10;
      x = ~~(x / 10);
    }
    return sum;
  };
  for (let x of nums) {
    minVal = Math.min(minVal, getSum(x));
  }
  return minVal;
};

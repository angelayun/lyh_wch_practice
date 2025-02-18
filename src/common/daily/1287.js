/**
 * @param {number[]} arr
 * @return {number}
 */
var findSpecialInteger = function (arr) {
  const n = arr.length;
  arr.sort((a, b) => a - b);
  return arr[Math.ceil(n * 0.25)];
};

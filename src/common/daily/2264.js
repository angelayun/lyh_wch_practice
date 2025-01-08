/**
 * @param {string} num
 * @return {string}
 */
var largestGoodInteger = function (num) {
  const n = num.length;
  let maxVal = -1;
  for (let i = 1; i < n - 1; i++) {
    if (num[i] == num[i - 1] && num[i] == num[i + 1]) {
      let curVal = num[i] * 100 + num[i] * 10 + Number(num[i]);
      maxVal = Math.max(maxVal, curVal);
    }
  }
  return maxVal == -1 ? '' : maxVal.toString().padStart(3, '0');
};

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var minChanges = function (n, k) {
  if ((n & k) != k) return -1;
  let changeVal = n ^ k;
  let count = 0;
  while (changeVal) {
    count++;
    changeVal &= changeVal - 1;
  }
  return count;
};

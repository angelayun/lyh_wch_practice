/**
 * @param {string} num
 * @return {boolean}
 */
var digitCount = function (num) {
  let cnt = new Map();
  for (let y of num) {
    cnt.set(y, (cnt.get(y) || 0) + 1);
  }
  for (let i = 0; i < num.length; i++) {
    if ((cnt.get(i.toString()) ?? 0) != num[i]) return false;
  }
  return true;
};
/**
 * @param {string} num
 * @return {boolean}
 */
var digitCount = function (num) {
  let n = num.length;
  let cnt = new Array(10).fill(0);
  for (let i = 0; i < n; i++) {
    cnt[num[i] - '0']++;
  }
  for (let i = 0; i < n; i++) {
    if (cnt[i] != num[i]) return false;
  }
  return true;
};

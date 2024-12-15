/**
 * @param {number[]} pref
 * @return {number[]}
 */
var findArray = function (pref) {
  const n = pref.length;
  let res = new Array(n).fill(0);
  res[0] = pref[0];
  for (let i = 1; i < n; i++) {
    res[i] = pref[i - 1] ^ pref[i];
  }
  return res;
};

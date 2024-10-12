/**
 * @param {number[]} pref
 * @return {number[]}
 */
var findArray = function (pref) {
  const n = pref.length
  let ans = [pref[0]]
  for (let i = 1; i < n; i++) {
    ans.push(pref[i - 1] ^ pref[i])
  }
  return ans
};
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var longestCommonPrefix = function (arr1, arr2) {
  let set = new Set();
  for (let x of arr1) {
    let s = x.toString();
    for (let i = 1; i <= s.length; i++) {
      set.add(s.slice(0, i));
    }
  }
  let ans = 0;
  for (let x of arr2) {
    let s = x.toString();
    for (let i = 1; i <= s.length; i++) {
      if (!set.has(s.slice(0, i))) {
        break;
      }
      ans = Math.max(ans, i);
    }
  }
  return ans;
};

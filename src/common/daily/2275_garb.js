/**
 * @param {number[]} candidates
 * @return {number}
 */
var largestCombination = function (candidates) {
  const n = candidates.length;
  let ans = 1;
  for (let right = 0; right < n; right++) {
    for (
      let left = right - 1;
      left >= 0 && (candidates[left] & candidates[right]) != candidates[left];
      left--
    ) {
      candidates[left] &= candidates[right];
      if (candidates[left] != 0) {
        ans = Math.max(right - left + 1, ans);
      }
    }
  }
  return ans;
};
// 这个思路不正确
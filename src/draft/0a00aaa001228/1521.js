/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var closestToTarget = function (arr, target) {
  let ans = Number.MAX_SAFE_INTEGER;
  const n = arr.length;
  for (let right = 0; right < n; right++) {
    ans = Math.min(ans, Math.abs(arr[right] - target));
    for (let left = right - 1; left >= 0; left--) {
      if ((arr[left] & arr[right]) == arr[left]) {
        break;
      }
      arr[left] &= arr[right];
      ans = Math.min(ans, Math.abs(arr[left] - target));
    }
  }
  return ans;
};

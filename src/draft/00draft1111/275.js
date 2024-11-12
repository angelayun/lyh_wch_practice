/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  const n = citations.length;
  let left = 1,
    right = n;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (citations[n - mid] >= mid) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return right;
};

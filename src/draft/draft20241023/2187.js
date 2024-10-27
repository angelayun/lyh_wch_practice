/**
 * @param {number[]} time
 * @param {number} totalTrips
 * @return {number}
 */
var minimumTime = function (time, totalTrips) {
  time.sort((a, b) => a - b)
  const n = time.length
  for (let i = 1; i < n; i++) {
    time[i] += time[i - 1]
  }
  let left = 0, right = n - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (time[mid] < totalTrips) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
};
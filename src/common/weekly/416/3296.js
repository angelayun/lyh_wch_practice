/**
 * @param {number} mountainHeight
 * @param {number[]} workerTimes
 * @return {number}
 */
var minNumberOfSeconds = function (mountainHeight, workerTimes) {
  let maxT = Math.max(...workerTimes);
  let h = ~~((mountainHeight - 1) / workerTimes.length) + 1;
  let left = 0,
    right = (maxT * h * (h + 1)) / 2;
  const check = (m, leftH) => {
    for (let t of workerTimes) {
      leftH -= ~~((Math.sqrt((m / t) * 8 + 1) - 1) / 2);
      if (leftH <= 0) return true;
    }
    return false;
  };
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1);
    if (check(mid, mountainHeight)) {
      right = mid;
    } else {
      left = mid;
    }
  }
  // console.log(right)
  return right;
  // return 0
};
// 这个超时了？
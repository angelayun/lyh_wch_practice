/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var minZeroArray = function (nums, queries) {
  const check = (q) => {
    const n = nums.length;
    let diff = new Array(n + 1).fill(0);
    for (let i = 0; i < q; i++) {
      let [l, r, val] = queries[i];
      diff[l] += val;
      diff[r + 1] -= val;
    }
    let sumD = 0;
    for (let i = 0; i < n; i++) {
      sumD += diff[i];
      if (sumD < nums[i]) {
        return false;
      }
    }
    return true;
  };
  let m = queries.length;
  let left = -1,
    right = m + 1;
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1);
    if (check(mid)) {
      right = mid;
    } else {
      left = mid;
    }
  }
  return right <= m ? right : -1;
};

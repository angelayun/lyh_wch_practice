/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var minZeroArray = function (nums, queries) {
  var check = function (k, nums, queries) {
    let n = nums.length;
    let diff = new Array(n + 1).fill(0);
    for (let i = 0; i < k; i++) {
      let [l, r, val] = queries[i];
      diff[l] += val;
      diff[r + 1] -= val;
    }
    let sumD = 0;
    for (let i = 0; i < n; i++) {
      sumD += diff[i];
      // 此时sumD中表示x=nums[i]要减掉多少
      if (nums[i] > sumD) {
        return false;
      }
    }
    return true;
  };
  let q = queries.length;
  let left = -1,
    right = q + 1;
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1);
    if (check(mid, nums, queries)) {
      right = mid;
    } else {
      left = mid;
    }
  }
  return right <= q ? right : -1;
};

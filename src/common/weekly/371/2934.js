/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minOperations = function (nums1, nums2) {
  const n = nums1.length;
  const f = (last1, last2) => {
    let res = 0;
    for (let i = 0; i < n - 1; i++) {
      let x = nums1[i],
        y = nums2[i];
      if (x > last1 || y > last2) {
        if (y > last1 || x > last2) {
          return n + 1;
        }
        res++;
      }
    }
    return res;
  };
  let ans = Math.min(
    f(nums1[n - 1], nums2[n - 1]),
    f[(nums2[n - 1], nums1[n - 1])]
  );
  return ans > n ? -1 : ans;
};

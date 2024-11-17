/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findXSum = function (nums, k, x) {
  const n = nums.length;
  let ans = new Array(n - k + 1).fill(0);
  let sum = 0,
    cnt = new Map();
  for (let i = 0; i < k - 1; i++) {
    sum += nums[i];
    cnt.set(nums[i], (cnt.get(nums[i]) || 0) + 1);
  }
  for (let i = k - 1; i < n; i++) {
    sum += nums[i];
    cnt.set(nums[i], (cnt.get(nums[i]) || 0) + 1);
    let curValue = Array.from(cnt.entries()).sort(
      (a, b) => b[1] - a[1] || b[0] - a[0]
    );

    if (curValue.length < x) {
      ans[i - k + 1] = sum;
    } else {
      let addCount = 0;
      let realSum = 0;
      let j = 0;
      while (addCount < x) {
        realSum += curValue[j][0] * curValue[j][1];
        addCount += curValue[j][1];
        j++;
      }
      ans[i - k + 1] = realSum;
    }
    let left = nums[i - k + 1];
    sum -= left;
    cnt.set(left, left - 1);
  }
  return ans;
};

export default findXSum;

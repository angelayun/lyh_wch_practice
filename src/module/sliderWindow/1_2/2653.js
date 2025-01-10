/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var getSubarrayBeauty = function (nums, k, x) {
  const n = nums.length;
  let cnt = new Array(101).fill(0);
  const MOVE = 50;
  for (let i = 0; i < k; i++) {
    cnt[nums[i] + MOVE]++;
  }
  const getAns = () => {
    let j = 0;
    for (let i = 0; i < 101; i++) {
      if (cnt[i]) {
        // 这里是计数排序  所以
        j += cnt[i];
        if (j >= x) {
          // 为什么是>= [-14,9,13,-26,47,-39,-49,-14,29] k是9 x是4的情况下
          return i <= MOVE ? i - MOVE : 0;
        }
      }
    }
  };
  let ans = new Array(n - k + 1).fill(0);
  ans[0] = getAns();
  for (let i = k; i < n; i++) {
    cnt[nums[i] + MOVE]++;
    cnt[nums[i - k] + MOVE]--;
    ans[i - k + 1] = getAns();
  }
  return ans;
};
export default getSubarrayBeauty;

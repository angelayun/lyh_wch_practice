/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
var minCost = function (nums, cost) {
  let total = 0n;
  for (let c of cost) {
    total += BigInt(c);
  }
  const n = nums.length;
  let arr = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    arr[i] = [nums[i], cost[i]];
  }
  arr.sort((a, b) => a[0] - b[0]);
  let cnt = 0n;
  for (let i = 0; i < n; i++) {
    cnt += BigInt(arr[i][1]);
    if (cnt > total >> 1n) {
      let ans = 0n;
      for (let j = 0; j < n; j++) {
        ans += BigInt(arr[j][1]) * BigInt(Math.abs(arr[j][0] - arr[i][0]));
      }
      return Number(ans);
    }
  }
};

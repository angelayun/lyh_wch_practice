let upperBound = (nums, target) => {
  let left = -1,
    right = nums.length;
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] > target) right = mid;
    else left = mid;
  }
  return right;
};
/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var gcdValues = function (nums, queries) {
  let max = Math.max(...nums);
  let cntX = new Array(max + 1).fill(0n);
  for (let x of nums) {
    cntX[x]++;
  }
  let cntGcd = new Array(max + 1).fill(0n);
  for (let i = max; i > 0; i--) {
    let c = 0n;
    for (let j = i; j <= max; j += i) {
      c += cntX[j];
      cntGcd[i] -= cntGcd[j];
    }
    cntGcd[i] += (c * (c - 1n)) >> 1n;
  }
  // console.log(cntGcd)
  let preSum = new Array(cntGcd.length).fill(0n);
  preSum[0] = cntGcd[0];
  for (let i = 1; i < preSum.length; i++) {
    preSum[i] += preSum[i - 1] + cntGcd[i];
  }
  // console.log(preSum)
  let ans = [];
  for (let x of queries) {
    let target = Number(upperBound(preSum, BigInt(x)));
    ans.push(target);
  }
  return ans;
};

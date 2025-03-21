/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  const n = nums.length;
  let max = Math.max(...nums);
  let bucket = new Array(max + 1).fill(0);
  for (let x of nums) {
    bucket[x]++;
  }
  const dp = new Array(max + 1).fill(0);
  dp[1] = bucket[1];
  for (let i = 2; i <= max; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + i * bucket[i]);
  }
  return dp[max];
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  const n = nums.length;
  let max = Math.max(...nums);
  let bucket = new Array(max + 1).fill(0);
  for (let x of nums) {
    bucket[x]++;
  }
  let f0 = 0;
  let f1 = bucket[1];

  for (let i = 2; i <= max; i++) {
    let newF = Math.max(f1, f0 + i * bucket[i]);
    f0 = f1;
    f1 = newF;
  }
  return f1;
};

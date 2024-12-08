/**
 * @param {number[]} nums
 * @return {number[]}
 */
var constructTransformedArray = function (nums) {
  const n = nums.length;
  let result = new Array(n).fill(0);
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    let j = (x > 0 ? i + x : i - Math.abs(x) + n) % n;
    j = (j + n) % n;
    console.log(x, j);
    result[i] = nums[j];
  }
  return result;
};

// 灵神有更简洁的写法
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var constructTransformedArray = function (nums) {
  const n = nums.length;
  let result = new Array(n).fill(0);
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    result[i] = nums[(((i + x) % n) + n) % n];
  }
  return result;
};

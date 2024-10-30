/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function (nums) {
  let set = new Set();
  let ans = [];
  for (let x of nums) {
    if (set.has(x)) {
      ans.push(x);
    }
    set.add(x);
  }
  return ans;
};
function countTrailingZeros(num) {
  // 将数字转换为二进制字符串
  let binaryStr = num.toString(2);
  // 计算末尾0的个数
  return binaryStr.split('').reverse().join('').match(/^0*/)[0].length;
}
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function (nums) {
  const n = nums.length - 2;
  let xorAll = n ^ (n + 1);
  for (let i = 0; i < nums.length; i++) {
    xorAll ^= i ^ nums[i];
  }
  // 这个时候xorArll是出现两次的数字的^和
  console.log(xorAll);
  // 二进制尾随0的个数
  let shift = countTrailingZeros(xorAll);
  let ans = new Array(2);
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    if (i < n) {
      ans[(i >> shift) & 1] ^= i;
    }
    ans[(x >> shift) & 1] ^= x;
  }
  return ans;
};

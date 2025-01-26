/**
 * @param {string[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var smallestTrimmedNumbers = function (nums, queries) {
  // 写一个纯暴力的写法
  const n = queries.length;
  // let ans = new Array(n).fill(0)
  let ans = [];
  for (let [k, t] of queries) {
    // k是第几小  t是trim的意思
    let list = [];
    for (let i = 0; i < nums.length; i++) {
      let x = nums[i];
      list.push([x.substr(x.length - t), i]);
    }
    list.sort((a, b) => a[0] - b[0]);
    ans.push(list[k - 1][1]);
  }
  return ans;
};
export default smallestTrimmedNumbers;
// 到时候看一下这个是否能过吧

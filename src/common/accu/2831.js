/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestEqualSubarray = function (nums, k) {
  // 题目说明了数组里面的元素范围在nums.length以内，所以可以用数组来代替map
  const n = nums.length;
  let pos = Array.from({ length: n + 1 }, () => []);
  for (let [i, num] of nums.entries()) {
    pos[num].push(i);
  }
  let ans = 0;
  for (let ps of pos) {
    let left = 0;
    for (let [right, p] of ps.entries()) {
      // p - ps[left] + 1  这个是整段长度，right - left + 1 是窗口长度，两者相减就是窗口内重复的元素个数
      while (p - ps[left] + 1 - (right - left + 1) > k) {
        left++;
      }
      ans = Math.max(ans, right - left + 1);
    }
  }
  return ans;
};

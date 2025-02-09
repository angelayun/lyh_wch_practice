/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function (nums, k, numOperations) {
  let cnt = new Map();
  let diff = new Map();
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
    // 把 x 插入 diff，以保证下面能遍历到 x
    // if (!diff.has(x)) diff.set(x, 0);
    diff.set(x, (diff.get(x) || 0) + 0);

    // 把 [x-k, x+k] 中的每个整数的出现次数都加一
    diff.set(x - k, (diff.get(x - k) || 0) + 1);
    diff.set(x + k + 1, (diff.get(x + k + 1) || 0) - 1);
  }
  let ans = 0;
  let sumD = 0;
  let keys = Array.from(diff.keys());
  keys.sort((a, b) => a - b);
  for (let x of keys) {
    let d = diff.get(x);
    sumD += d;
    
    ans = Math.max(ans, Math.min(sumD, (cnt.get(x) ?? 0) + numOperations));
  }
  return ans;
};
// 上面是差分数组的方式  下面是滑动窗口的方式 
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function (nums, k, numOperations) {
  nums.sort((a, b) => a - b);
  let n = nums.length;
  let ans = 0,
    cnt = 0;
  let left = 0,
    right = 0;
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    cnt++;
    // 循环直到连续相同段的末尾  这样可以统计出x的出现次数
    if (i < n - 1 && x == nums[i + 1]) continue;
    while (nums[left] < x - k) {
      left++;
    }
    while (right < n && nums[right] <= x + k) {
      right++;
    }
    // 循环结束之后 left指向第一个x-k的位置  right指向第一个>x+k的位置  相当于左闭右开区间
    ans = Math.max(ans, Math.min(right - left, cnt + numOperations));
    cnt = 0;
  }
  if (ans >= numOperations) return ans;
  for (let left = 0, right = 0; right < n; right++) {
    let x = nums[right];
    while (nums[left] < x - k * 2) left++;
    ans = Math.max(ans, right - left + 1);
  }
  return Math.min(ans, numOperations);
};

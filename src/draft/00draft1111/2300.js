// 返回大于等于target值的最小索引
const lowerBound = (nums, target) => {
  const n = nums.length;
  let left = 0,
    right = n - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};
/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {
  // 从小到大排序
  potions.sort((a, b) => a - b);
  const n = spells.length;
  const m = potions.length;
  let ans = [];
  for (let i = 0; i < n; i++) {
    let target = Math.ceil(success / spells[i]);
    let index = lowerBound(potions, target);
    ans.push(potions.length - index);
  }
  return ans;
};

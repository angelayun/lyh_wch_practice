/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countGood = function (nums, k) {
  const n = nums.length;
  let numToCountMap = new Map();
  let res = 0;
  let countSame = 0;
  for (let left = 0, right = 0; right < n; right++) {
    let x = nums[right];
    countSame += numToCountMap.get(x) ?? 0;
    numToCountMap.set(x, (numToCountMap.get(x) || 0) + 1);
    while (countSame >= k) {
      let y = nums[left];
      if (numToCountMap.get(y) > 1) {
        countSame -= numToCountMap.get(y) - 1;
      }
      numToCountMap.set(y, (numToCountMap.get(y) || 0) - 1);
      left++;
    }
    res += left;
  }
  return res;
};

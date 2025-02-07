// 树状数组模板
class BIT {
  // 树状数组的下标是从1开始的
  constructor(n) {
    this.tree = new Array(n).fill(0);
  }
  add(x) {
    while (x < this.tree.length) {
      this.tree[x]++;
      // 不断的加它的lowBit
      x += x & -x;
    }
  }
  query(x) {
    let res = 0;
    while (x > 0) {
      res += this.tree[x];
      // 不断的减它的lowBit
      x &= x - 1;
    }
    return res;
  }
}
const lowerBound = (a, x) => {
  let left = 0,
    right = a.length;
  while (left < right) {
    var mid = left + ((right - left) >> 1);
    if (a[mid] < x) left = mid + 1;
    else right = mid;
  }
  return left;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var resultArray = function (nums) {
  let sortedNums = Array.from(new Set(nums));
  sortedNums.sort((a, b) => a - b);
  let m = sortedNums.length;
  let a = [nums[0]];
  let b = [nums[1]];
  let t1 = new BIT(m + 1);
  let t2 = new BIT(m + 1);
  t1.add(lowerBound(sortedNums, nums[0]) + 1);
  t2.add(lowerBound(sortedNums, nums[1] + 1));
  for (let i = 2; i < nums.length; i++) {
    let x = nums[i];
    let v = lowerBound(sortedNums, x) + 1;
    let gc1 = a.length - t1.query(v);
    let gc2 = b.length - t2.query(v);
    if (gc1 > gc2 || (gc1 == gc2 && a.length <= b.length)) {
      a.push(x);
      t1.add(v);
    } else {
      b.push(x);
      t2.add(v);
    }
  }
  return [...a, ...b];
};

// 严格按顺序从小到大生成所有回文数（不用字符串转换）
let pal = new Array(109999).fill(0);
let palIdx = 0;
for (let base = 1; base <= 10000; base *= 10) {
  // 生成奇数长度回文数
  for (let i = base; i < base * 10; i++) {
    let x = i;
    for (let t = ~~(i / 10); t > 0; t = ~~(t / 10)) {
      x = x * 10 + (t % 10);
    }
    pal[palIdx++] = x;
  }
  // 生成偶数长度回文数
  if (base <= 1000) {
    for (let i = base; i < base * 10; i++) {
      let x = i;
      for (let t = i; t > 0; t = ~~(t / 10)) {
        x = x * 10 + (t % 10);
      }
      pal[palIdx++] = x;
    }
  }
}
// 哨兵，防止下面代码中的 i 下标越界
pal[palIdx++] = 1_000_000_001;
let lowerBound = (target) => {
  let left = -1,
    right = pal.length;
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1);
    if (pal[mid] < target) left = mid;
    else right = mid;
  }
  return right;
};
// 返回 nums 中的所有数变成 pal[i] 的总代价
const cost = (nums, i) => {
  let target = pal[i];
  let sum = 0;
  for (let x of nums) {
    sum += Math.abs(x - target);
  }
  return sum;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumCost = function (nums) {
  // 排序只是为了找中位数，如果用快速选择算法，可以做到 O(n)
  nums.sort((a, b) => a - b);
  const n = nums.length;
  // 二分找中位数右侧最近的回文数
  let i = lowerBound(nums[(n - 1) >> 1]);
  // 回文数在中位数范围内
  if (pal[i] <= nums[n >> 1]) {
    let aa = cost(nums, i);
    console.log(aa);
    return aa;
  }
  // 枚举离中位数最近的两个回文数 pal[i-1] 和 pal[i]
  let bbb = Math.min(cost(nums, i - 1), cost(nums, i));
  console.log(bbb);
  return bbb;
};

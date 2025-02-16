/**
 * @param {number[]} nums
 * @return {number}
 */
var longestMonotonicSubarray = function (a) {
  let ans = 1;
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (a[j] <= a[j - 1]) break;
      // 严格递增的情况
      ans = Math.max(ans, j - i + 1);
    }
    for (let j = i + 1; j < n; j++) {
      if (a[j] >= a[j - 1]) break;
      // 严格递减的情况
      ans = Math.max(ans, j - i + 1);
    }
  }
  return ans;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestMonotonicSubarray = function (a) {
  // 初始化最大单调子数组的长度为 1
  let ans = 1;
  // 初始化索引 i 为 0，获取数组的长度 n
  let i = 0;
  const n = a.length;

  // 开始遍历数组
  while (i < n - 1) {
    // 如果当前元素和下一个元素相等，直接跳过该元素
    if (a[i + 1] === a[i]) {
      i++;
      continue;
    }

    // 记录当前单调子数组的起始位置
    const i0 = i;
    // 判断当前是严格递增还是严格递减的基调
    const inc = a[i + 1] > a[i];

    // 从 i + 2 开始继续判断是否符合单调规则
    i += 2;
    while (i < n && a[i] !== a[i - 1] && a[i] > a[i - 1] === inc) {
      i++;
    }

    // 计算从 i0 到 i - 1 这个单调子数组的长度，并更新最大长度
    ans = Math.max(ans, i - i0);

    // 回退一步，因为下一次循环会从下一个位置开始判断
    i--;
  }

  return ans;
};

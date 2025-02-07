/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k1
 * @param {number} k2
 * @return {number}
 */
var minSumSquareDiff = function (a, nums2, k1, k2) {
  let k = k1 + k2;
  let n = a.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    a[i] = Math.abs(a[i] - nums2[i]);
    ans += a[i] * a[i];
  }
  let sum = a.reduce((pre, cur) => pre + cur);
  // 所有的数都可以变成0
  if (sum <= k) return 0;
  // 对于两个数，先减大的
  a.sort((a, b) => b - a);
  // 加一个哨兵节点
  a.push(0);
  for (let i = 0; i < n; i++) {
    let v = a[i];
    // 把当前元素从ans中减去 （前面已经加到答案中了，现在先减去）
    ans -= v * v;
    let c = i + 1; // 前面一共有多少个
    // 减少到跟下一个相同
    let cnt = c * (v - a[i + 1]);
    if (cnt < k) {
      k -= cnt;
      continue;
    }
    // 不够的话 每个可减少 Math.floor(k / c)
    v -= Math.floor(k / c);
    // 前面(k % c) 可以多减少1个  后面的只能减少v个
    ans += (k % c) * (v - 1) * (v - 1);
    ans += (c - (k % c)) * v * v;
    return ans;
  }
};

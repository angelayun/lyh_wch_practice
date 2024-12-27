/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function (arr) {
  // https://leetcode.cn/problems/number-of-sub-arrays-with-odd-sum/solutions/2796951/qi-ou-qian-zhui-he-by-yi-cheng-8i-g496/
  const n = arr.length;
  let preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    // 强制奇数转成1 偶数转成0
    let t = arr[i] & 1;
    // 当前和的奇偶性
    preSum[i + 1] = preSum[i] ^ t;
  }
  let res = 0n;
  // 偶数的个数
  let count0 = 0n,
    // 奇数的个数
    count1 = 0n;
  // 当前遍历的数是偶数，那么只需要找到前面奇数的个数，如果是奇数，那么只需要找到偶数的个数即可
  for (let i = 0; i < preSum.length; i++) {
    if (preSum[i]) {
      res += count0;
      count1++;
    } else {
      res += count1;
      count0++;
    }
  }
  // 取模的两种表示方式  都行  不要用Math.pow了
  return Number(res % BigInt(1_000_000_007));
  return Number(res % BigInt(1e9 + 7));
};

/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function (arr) {
  let cnt = [1, 0];
  let preSum = 0;
  let res = 0;
  for (let x of arr) {
    preSum ^= x & 1;
    res += cnt[preSum ^ 1];
    cnt[preSum] += 1;
  }
  return res % 1_000_000_007;
};
// TODO 这个还不是特别理解
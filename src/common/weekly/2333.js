var minSumSquareDiff = function (nums1, nums2, k1, k2) {
  const arr = new Array(1e5 + 1).fill(0);
  for (let i = 0; i < nums1.length; i++) {
    arr[Math.abs(nums1[i] - nums2[i])]++;
  }
  // nums1 = [3,5,4,4], nums2 = [1,2,1,0], k1 = 2, k2 = 4 为例
  // 最终 arr 前面部分是这样子的[0, 0, 1, 2, 1, 0, 0]  也就是说差值为2的出现1次 差值为3的出现2次  差值为4的出现1次
  let k = k1 + k2;
  let i = arr.length - 1;
  for (; k > 0 && i > 0; i--) {
    const change = Math.min(k, arr[i]);
    // 能改变操作的数
    arr[i - 1] += change;
    // 以上面这个为例子 出现4的减少为3  那么3的出现次数就增加了change次  4的出现次数就减少了change次
    k -= change;
    arr[i] -= change;
  }
  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      // i是 diff  arr[i]是还遗留多少次
      res += arr[i] * i * i;
    }
  }
  return res;
  // return arr.reduce((cur, next, index) => index * index * next + cur, 0);
};
// export default minSumSquareDiff;

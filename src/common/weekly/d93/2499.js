/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minimumTotalCost = function (nums1, nums2) {
  let ans = 0n;
  let swapCnt = 0,
    modeCnt = 0;
  let mode = 0,
    n = nums1.length;
  let cnt = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    let x = nums1[i];
    if (x == nums2[i]) {
      ans += BigInt(i);
      swapCnt++;
      cnt[x]++;
      if (cnt[x] > modeCnt) {
        modeCnt = cnt[x];
        mode = x;
      }
    }
  }
  for (let i = 0; i < n && modeCnt * 2 > swapCnt; i++) {
    let x = nums1[i],
      y = nums2[i];
    if (x != y && x != mode && y != mode) {
      ans += BigInt(i);
      swapCnt++;
    }
  }
  return modeCnt * 2 > swapCnt ? -1 : Number(ans);
};

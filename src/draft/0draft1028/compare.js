/**
 * @param {number[]} ages
 * @return {number}
 */
var numFriendRequests = function (ages) {
  let cnt = new Array(121).fill(0);
  for (let age of ages) {
    cnt[age]++;
  }
  let ans = 0,
    cntWindows = 0;
  for (let left = 0, right = 0; right < cnt.length; right++) {
    cntWindows += cnt[right];
    if (left * 2 <= right + 14) {
      cntWindows -= cnt[left];
      left++;
    }
    if (cntWindows) {
      ans += cnt[right] * cntWindows - cnt[left];
    }
  }
  return ans;
};

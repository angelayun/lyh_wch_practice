/**
 * @param {number[]} ages
 * @return {number}
 */
var numFriendRequests = function (ages) {
  // cnt中存放的是每个年龄中共有多少个人 因为题目说明年龄的最大值为120
  let cnt = new Array(121).fill(0);
  for (let age of ages) {
    cnt[age]++;
  }
  let ans = 0,
    cntWindows = 0;
  // ages[y] <= 0.5 * ages[x] + 7  & ages[y] > ages[x]
  // 说明右值比左值大  而2 * ages[y] <= ages[x] + 14  也就是说当
  for (let left = 0, right = 0; right < cnt.length; right++) {
    cntWindows += cnt[right];
    /* if (left * 2 <= right + 14) {
      cntWindows -= cnt[left];
      left++;
    } */
    if (2 * right > left + 14) {
      cntWindows -= cnt[left];
      left++;
    }
    if (cntWindows) {
      ans += cnt[right] * cntWindows - cnt[left];
    }
  }
  return ans;
};

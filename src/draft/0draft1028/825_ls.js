var numFriendRequests = function (ages) {
  const cnt = Array(121).fill(0);
  for (const age of ages) {
    cnt[age]++;
  }

  let ans = 0,
    cntWindow = 0;
  for (let left = 0, right = 0; right < cnt.length; right++) {
    cntWindow += cnt[right];
    if (left * 2 <= right + 14) {
      // 不能发送好友请求
      cntWindow -= cnt[left];
      left++;
    }
    if (cntWindow > 0) {
      // 存在可以发送好友请求的用户
      ans += cnt[right] * cntWindow - cnt[right];
    }
  }
  return ans;
};

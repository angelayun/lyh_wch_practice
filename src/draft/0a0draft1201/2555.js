var maximizeWin = function (prizePositions, k) {
  let n = prizePositions.length;
  if (k * 2 + 1 >= prizePositions[n - 1] - prizePositions[0]) {
    return n;
  }
  let ans = 0,
    mx = 0,
    left = 0,
    right = 0;
  for (let mid = 0; mid < n; mid++) {
    // 把 prizePositions[mid] 视作第二条线段的左端点，计算第二条线段可以覆盖的最大奖品下标
    while (right < n && prizePositions[right] - prizePositions[mid] <= k) {
      right++;
    }
    // 循环结束后，right-1 是第二条线段可以覆盖的最大奖品下标
    ans = Math.max(ans, mx + right - mid);
    // 把 prizePositions[mid] 视作第一条线段的右端点，计算第一条线段可以覆盖的最小奖品下标
    while (prizePositions[mid] - prizePositions[left] > k) {
      left++;
    }
    // 循环结束后，left 是第一条线段可以覆盖的最小奖品下标
    mx = Math.max(mx, mid - left + 1);
  }
  return ans;
};

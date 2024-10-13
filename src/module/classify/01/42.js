// 前后缀分解
var trap = function (height) {
  const n = height.length;
  const preMax = Array(n); // preMax[i] 表示从 height[0] 到 height[i] 的最大值
  preMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    preMax[i] = Math.max(preMax[i - 1], height[i]);
  }

  const sufMax = Array(n); // sufMax[i] 表示从 height[i] 到 height[n-1] 的最大值
  sufMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    sufMax[i] = Math.max(sufMax[i + 1], height[i]);
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += Math.min(preMax[i], sufMax[i]) - height[i]; // 累加每个水桶能接多少水
  }
  return ans;
};
// 双向双指针
var trap = function (height) {
  let ans = 0, left = 0, right = height.length - 1, preMax = 0, sufMax = 0;
  while (left < right) {
    preMax = Math.max(preMax, height[left]);
    sufMax = Math.max(sufMax, height[right]);
    if (preMax < sufMax) {
      ans += preMax - height[left++];
    } else {
      ans += sufMax - height[right--];
    }
  }
  return ans;
};
// 单调栈
var trap = function (height) {
  let ans = 0;
  const st = [];
  for (let i = 0; i < height.length; i++) {
    while (st.length && height[i] >= height[st[st.length - 1]]) {
      const bottomH = height[st.pop()];
      if (st.length === 0) {
        break;
      }
      const left = st[st.length - 1];
      const dh = Math.min(height[left], height[i]) - bottomH; // 面积的高
      ans += dh * (i - left - 1);
    }
    st.push(i);
  }
  return ans;
};
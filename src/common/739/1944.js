var canSeePersonsCount = function (heights) {
  const n = heights.length;
  const ans = Array(n).fill(0);
  const st = [];
  for (let i = n - 1; i >= 0; i--) {
    while (st.length && st[st.length - 1] < heights[i]) {
      st.pop();
      ans[i]++;
    }
    if (st.length) {
      // 还可以再看到一个人
      ans[i]++;
    }
    st.push(heights[i]);
  }
  return ans;
};

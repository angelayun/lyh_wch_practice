// 从右向左
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  const st = [];
  for (let i = n - 1; i >= 0; i--) {
    const t = temperatures[i];
    while (st.length && t >= temperatures[st[st.length - 1]]) {
      st.pop();
    }
    if (st.length) {
      ans[i] = st[st.length - 1] - i;
    }
    st.push(i);
  }
  return ans;
};
// 从左到右
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  const st = [];
  for (let i = 0; i < n; i++) {
    const t = temperatures[i];
    while (st.length && t > temperatures[st[st.length - 1]]) {
      const j = st.pop();
      ans[j] = i - j;
    }
    st.push(i);
  }
  return ans;
};
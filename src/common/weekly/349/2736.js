var maximumSumQueries = function (nums1, nums2, queries) {
  const a = _.zip(nums1, nums2).sort((a, b) => b[0] - a[0]);
  const qid = [...queries.keys()].sort((i, j) => queries[j][0] - queries[i][0]);

  const ans = Array(queries.length);
  const st = [];
  let j = 0;
  for (const i of qid) {
    const [x, y] = queries[i];
    for (; j < a.length && a[j][0] >= x; j++) {
      // 下面只需关心 a[j][1]
      while (st.length && st[st.length - 1][1] <= a[j][0] + a[j][1]) {
        // a[j][1] >= st[st.length-1][0]
        st.pop();
      }
      if (!st.length || st[st.length - 1][0] < a[j][1]) {
        st.push([a[j][1], a[j][0] + a[j][1]]);
      }
    }
    const p = lowerBound(st, y);
    ans[i] = p < st.length ? st[p][1] : -1;
  }
  return ans;
};

// 开区间写法，原理请看 b23.tv/AhwfbS2
var lowerBound = function (st, target) {
  let left = -1,
    right = st.length; // 开区间 (left, right)
  while (left + 1 < right) {
    // 区间不为空
    const mid = left + ((right - left) >> 1);
    if (st[mid][0] >= target) {
      right = mid; // 范围缩小到 (left, mid)
    } else {
      left = mid; // 范围缩小到 (mid, right)
    }
  }
  return right; // 或者 left+1
};

var closestNodes = function (root, queries) {
  const a = [];
  function dfs(node) {
    if (node === null) {
      return;
    }
    dfs(node.left);
    a.push(node.val);
    dfs(node.right);
  }
  dfs(root);

  const n = a.length;
  const ans = [];
  for (const q of queries) {
    let j = lowerBound(a, q);
    const mx = j < n ? a[j] : -1;
    if (j === n || a[j] !== q) {
      // a[j]>q, a[j-1]<q
      j--;
    }
    const mn = j >= 0 ? a[j] : -1;
    ans.push([mn, mx]);
  }
  return ans;
};

// 见 https://www.bilibili.com/video/BV1AP41137w7/
var lowerBound = function (a, target) {
  let left = -1,
    right = a.length; // 开区间 (left, right)
  while (left + 1 < right) {
    // 区间不为空
    const mid = Math.floor((left + right) / 2);
    if (a[mid] >= target) {
      right = mid; // 范围缩小到 (left, mid)
    } else {
      left = mid; // 范围缩小到 (mid, right)
    }
  }
  return right;
};

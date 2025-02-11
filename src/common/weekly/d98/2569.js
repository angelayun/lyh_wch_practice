var handleQuery = function (nums1, nums2, queries) {
  const n = nums1.length;
  const m = 2 << (32 - Math.clz32(n));
  const cnt1 = Array(m).fill(0);
  const flip = Array(m).fill(false);

  // 维护区间 1 的个数
  function maintain(o) {
    cnt1[o] = cnt1[o * 2] + cnt1[o * 2 + 1];
  }

  // 执行区间反转
  function do_(o, l, r) {
    cnt1[o] = r - l + 1 - cnt1[o];
    flip[o] = !flip[o];
  }

  // 初始化线段树   o,l,r=1,0,n-1
  function build(a, o, l, r) {
    if (l === r) {
      cnt1[o] = a[l];
      return;
    }
    const m = Math.floor((l + r) / 2);
    build(a, o * 2, l, m);
    build(a, o * 2 + 1, m + 1, r);
    maintain(o);
  }

  // 反转区间 [L,R]   o,l,r=1,0,n-1
  function update(o, l, r, L, R) {
    if (L <= l && r <= R) {
      do_(o, l, r);
      return;
    }
    const m = Math.floor((l + r) / 2);
    if (flip[o]) {
      do_(o * 2, l, m);
      do_(o * 2 + 1, m + 1, r);
      flip[o] = false;
    }
    if (m >= L) {
      update(o * 2, l, m, L, R);
    }
    if (m < R) {
      update(o * 2 + 1, m + 1, r, L, R);
    }
    maintain(o);
  }

  build(nums1, 1, 0, n - 1);
  const ans = [];
  let sum = _.sum(nums2);
  for (const [op, l, r] of queries) {
    if (op === 1) {
      update(1, 0, n - 1, l, r);
    } else if (op === 2) {
      sum += l * cnt1[1];
    } else {
      ans.push(sum);
    }
  }
  return ans;
};

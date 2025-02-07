class BIT {
  // 树状数组的下标是从1开始的
  constructor(n) {
    this.tree = new Array(n).fill(0);
  }
  add(x) {
    while (x < this.tree.length) {
      this.tree[x]++;
      // 不断的加它的lowBit
      x += x & -x;
    }
  }
  query(x) {
    let res = 0;
    while (x > 0) {
      res += this.tree[x];
      // 不断的减它的lowBit
      x &= x - 1;
    }
    return res;
  }
}
const lowerBound = (a, x) => {
  let left = 0,
    right = a.length;
  while (left < right) {
    var mid = left + ((right - left) >> 1);
    if (a[mid] < x) left = mid + 1;
    else right = mid;
  }
  return left;
};
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} diff
 * @return {number}
 */
var numberOfPairs = function (a, nums2, diff) {
  const n = a.length;
  for (let i = 0; i < n; i++) {
    a[i] -= nums2[i];
  }
  /* let b = a.map((v, i) => {
    return [v, i];
  });
  b.sort((a, p) => a[0] - p[0]); */
  let b = Array.from(new Set(a));
  b.sort((a, p) => a - p);
  let ans = 0n;
  let t = new BIT(b.length + 1);
  for (let x of a) {
    ans += BigInt(t.query(lowerBound(b, x + diff + 1)));
    t.add(lowerBound(b, x) + 1);
  }
  return Number(ans);
};

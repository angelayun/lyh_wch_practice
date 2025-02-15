class Fenwick {
  constructor(n) {
    this.tree = new Array(n).fill(0);
  }

  add(i) {
    while (i < this.tree.length) {
      this.tree[i]++;
      i += i & -i;
    }
  }

  // [1,i] 中的元素和
  pre(i) {
    let res = 0;
    while (i > 0) {
      res += this.tree[i];
      i -= i & -i;
    }
    return res;
  }

  // [l,r] 中的元素和
  query(l, r) {
    return this.pre(r) - this.pre(l - 1);
  }
}
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (arr[mid] === target) {
          return mid;
      } else if (arr[mid] < target) {
          low = mid + 1;
      } else {
          high = mid - 1;
      }
  }
  return -1; // 如果找不到目标值，返回-1
}
/**
 * @param {number[]} xCoord
 * @param {number[]} yCoord
 * @return {number}
 */
var maxRectangleArea = function (xCoord, yCoord) {
  const n = xCoord.length;
  const points = Array.from({ length: n }, () => [0, 0]);

  for (let i = 0; i < n; i++) {
    points[i][0] = xCoord[i];
    points[i][1] = ys[i];
  }

  // 按x坐标升序排序，如果相同则按y坐标升序排序
  points.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
  // 对ys进行排序用于离散化
  const sortedYs = [...ys].sort((a, b) => a - b);

  let ans = -1;
  const tree = new Fenwick(n + 1);
  tree.add(binarySearch(sortedYs, points[0][1]) + 1); // 离散化
  const pre = Array.from({ length: n }, () => [0, 0, 0]);

  for (let i = 1; i < n; i++) {
    const x1 = points[i - 1][0];
    const y1 = points[i - 1][1];
    const x2 = points[i][0];
    const y2 = points[i][1];
    const y = binarySearch(sortedYs, y2); // 离散化
    tree.add(y + 1);

    if (x1 !== x2) {
      // 两点不在同一列
      continue;
    }

    const cur = tree.query(binarySearch(sortedYs, y1) + 1, y + 1);
    const p = pre[y];

    if (p[2] > 0 && p[2] + 2 === cur && p[1] === y1) {
      ans = Math.max(ans, (x2 - p[0]) * (y2 - y1));
    }

    p[0] = x1;
    p[1] = y1;
    p[2] = cur;
  }

  return ans;
};

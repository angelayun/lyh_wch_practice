class FenwickTree {
  constructor(n) {
    this.t = Array.from({ length: n + 1 }, () => [0, 0]);
  }

  // op=1，添加一个 size
  // op=-1，移除一个 size
  update(size, op) {
    for (let i = this.t.length - size; i < this.t.length; i += i & -i) {
      this.t[i][0] += op;
      this.t[i][1] += op * size;
    }
  }

  // 返回 >= size 的元素个数，元素和
  query(size) {
    let cnt = 0,
      sum = 0;
    for (let i = this.t.length - size; i > 0; i &= i - 1) {
      cnt += this.t[i][0];
      sum += this.t[i][1];
    }
    return [cnt, sum];
  }
}
/**
 * @param {number[]} colors
 * @param {number[][]} queries
 * @return {number[]}
 */
var numberOfAlternatingGroups = function (a, queries) {
  // 添加一个结束位置 i
  const add = (set, t, n, i) => {
    if (set.size === 0) {
      t.update(n, 1);
    } else {
      update(set, t, n, i, 1);
    }
    set.add(i);
  };
  // 移除一个结束位置 i
  const del = (set, t, n, i) => {
    set.delete(i);
    if (set.size === 0) {
      t.update(n, -1);
    } else {
      update(set, t, n, i, -1);
    }
  };
  // op=1，添加一个结束位置 i
  // op=-1，移除一个结束位置 i
  const update = (set, t, n, i, op) => {
    const sortedSet = Array.from(set).sort((a, b) => a - b);
    let preIndex = sortedSet.findIndex((val) => val <= i);
    let pre =
      preIndex === -1 ? sortedSet[sortedSet.length - 1] : sortedSet[preIndex];

    let nxtIndex = sortedSet.findIndex((val) => val >= i);
    let nxt = nxtIndex === -1 ? sortedSet[0] : sortedSet[nxtIndex];

    t.update(((nxt - pre + n - 1) % n) + 1, -op); // 移除/添加旧长度
    t.update((i - pre + n) % n, op);
    t.update((nxt - i + n) % n, op); // 添加/移除新长度
  };
  const n = a.length;
  const set = new Set();
  const t = new FenwickTree(n);

  for (let i = 0; i < n; i++) {
    if (a[i] === a[(i + 1) % n]) {
      add(set, t, n, i); // i 是一个结束位置
    }
  }

  const ans = [];
  for (const q of queries) {
    if (q[0] === 1) {
      if (set.size === 0) {
        ans.push(n); // 每个长为 size 的子数组都符合要求
      } else {
        const res = t.query(q[1]);
        ans.push(res[1] - res[0] * (q[1] - 1));
      }
    } else {
      const i = q[1];
      if (a[i] === q[2]) {
        // 无影响
        continue;
      }
      const pre = (i - 1 + n) % n;
      const nxt = (i + 1) % n;
      // 修改前，先去掉结束位置
      if (a[pre] === a[i]) {
        del(set, t, n, pre);
      }
      if (a[i] === a[nxt]) {
        del(set, t, n, i);
      }
      a[i] ^= 1;
      // 修改后，添加新的结束位置
      if (a[pre] === a[i]) {
        add(set, t, n, pre);
      }
      if (a[i] === a[nxt]) {
        add(set, t, n, i);
      }
    }
  }
  return ans;
};
// TODO 这个过不了  go里面用了红黑树  
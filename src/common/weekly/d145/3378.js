/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var countComponents = function (nums, threshold) {
  let n = nums.length;
  // 默认先自己指向自己
  let fa = Array.from({ length: n }, (v, k) => k);
  let idx = new Array(threshold + 1).fill(-1);
  for (let i = 0; i < n; i++) {
    if (nums[i] <= threshold) {
      idx[nums[i]] = i;
    }
  }
  const find = (fa, x) => {
    if (fa[x] != x) {
      fa[x] = find(fa, fa[x]);
    }
    return fa[x];
  };
  for (let g = 1; g <= threshold; g++) {
    let minX = -1;
    for (let x = g; x <= threshold; x += g) {
      if (idx[x] >= 0) {
        minX = x;
        break;
      }
    }
    if (minX < 0) continue;
    let fi = find(fa, idx[minX]);
    let upper = Number(BigInt(g * threshold) / BigInt(minX));
    for (let y = minX + g; y <= upper; y += g) {
      if (idx[y] >= 0) {
        let fj = find(fa, idx[y]);
        if (fj != fi) {
          fa[fj] = fi;
          n--;
        }
      }
    }
  }

  return n;
};

/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} hFences
 * @param {number[]} vFences
 * @return {number}
 */
var maximizeSquareArea = function (m, n, hFences, vFences) {
  const f = (a, mx) => {
    // 复制数组并添加边界值
    const len = a.length;
    const newA = [...a, 1, mx];
    // 对数组进行排序
    newA.sort((a, b) => a - b);

    const set = new Set();
    // 双重循环计算所有可能的间距
    for (let i = 0; i < newA.length; i++) {
      for (let j = i + 1; j < newA.length; j++) {
        set.add(newA[j] - newA[i]);
      }
    }
    return set;
  };
  // 调用 f 方法分别处理水平和垂直围栏，得到所有可能的间距集合
  const h = f(hFences, m);
  const v = f(vFences, n);
  let ans = 0;

  // 遍历水平围栏间距集合
  for (const x of h) {
    // 如果垂直围栏间距集合中包含当前水平围栏间距
    if (v.has(x)) {
      // 更新最大边长
      ans = Math.max(ans, x);
    }
  }

  // 如果最大边长大于 0，计算正方形面积并取模；否则返回 -1
  return ans > 0 ? (ans * ans) % 1000000007 : -1;
};

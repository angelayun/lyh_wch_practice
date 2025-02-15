class Node {
  constructor() {
    this.son = new Array(26).fill(null); // 初始化26个子节点
    this.minL = Infinity; // JavaScript中的Infinity表示无穷大
    this.i = -1; // 初始索引设为-1
  }
}
/**
 * @param {string[]} wordsContainer
 * @param {string[]} wordsQuery
 * @return {number[]}
 */
var stringIndices = function (wordsContainer, wordsQuery) {
  const root = new Node();

  // 构建字典树
  for (let idx = 0; idx < wordsContainer.length; ++idx) {
    const s = wordsContainer[idx].split(''); // 将字符串转换为字符数组
    const l = s.length;
    let cur = root;

    if (l < cur.minL) {
      cur.minL = l;
      cur.i = idx;
    }

    // 反向遍历字符串，构建字典树
    for (let i = s.length - 1; i >= 0; i--) {
      const b = s[i].charCodeAt(0) - 'a'.charCodeAt(0); // 计算字符对应的索引
      if (cur.son[b] === null) {
        cur.son[b] = new Node();
      }
      cur = cur.son[b];
      if (l < cur.minL) {
        cur.minL = l;
        cur.i = idx;
      }
    }
  }

  // 查询结果
  const ans = new Array(wordsQuery.length);
  for (let idx = 0; idx < wordsQuery.length; idx++) {
    const s = wordsQuery[idx].split(''); // 将字符串转换为字符数组
    let cur = root;

    // 反向遍历查询字符串，找到最深的匹配节点
    for (
      let i = s.length - 1;
      i >= 0 && cur.son[s[i].charCodeAt(0) - 'a'.charCodeAt(0)] !== null;
      i--
    ) {
      cur = cur.son[s[i].charCodeAt(0) - 'a'.charCodeAt(0)];
    }
    ans[idx] = cur.i;
  }

  return ans;
};

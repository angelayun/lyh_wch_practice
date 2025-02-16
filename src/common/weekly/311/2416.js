// 字典树模板
class Node {
  constructor() {
    // 存储子节点的数组，长度为 26，对应 26 个字母
    this.son = new Array(26).fill(null);
    // 存储前缀分数
    this.score = 0;
  }
}
/**
 * @param {string[]} words
 * @return {number[]}
 */
var sumPrefixScores = function (words) {
  // 创建根节点
  const root = new Node();

  // 遍历每个单词，构建前缀树并更新前缀分数
  for (const word of words) {
    let cur = root;
    for (let i = 0; i < word.length; i++) {
      // 将字符转换为 0 - 25 的索引
      const c = word.charCodeAt(i) - 'a'.charCodeAt(0);
      if (cur.son[c] === null) {
        cur.son[c] = new Node();
      }
      cur = cur.son[c];
      // 更新当前前缀的分数
      cur.score++;
    }
  }

  const n = words.length;
  const ans = new Array(n).fill(0);

  // 遍历每个单词，计算每个单词所有前缀的分数总和
  for (let i = 0; i < n; i++) {
    let cur = root;
    for (let j = 0; j < words[i].length; j++) {
      const c = words[i].charCodeAt(j) - 'a'.charCodeAt(0);
      cur = cur.son[c];
      // 累加当前前缀的分数到结果数组中
      ans[i] += cur.score;
    }
  }

  return ans;
};

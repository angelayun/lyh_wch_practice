class Node {
  constructor() {
    // key 是pair value是Node
    this.son = new Map();
    this.cnt = 0; // 以该节点结尾的字符串（pair列表）的出现次数
  }
}
/**
 * @param {string[]} words
 * @return {number}
 */
var countPrefixSuffixPairs = function (words) {
  let ans = 0;
  let root = new Node(); // 字典树的根节点（对应空列表）
  for (let s of words) {
    let cur = root;
    const n = s.length;
    for (let i = 0; i < n; i++) {
      let p = `${s[i]}_${s[n - 1 - i]}`;
      if (!cur.son.has(p)) {
        cur.son.set(p, new Node());
      }
      cur = cur.son.get(p);
      ans += cur.cnt;
    }
    // 循环结束后，cur现在的位置是s的pair列表的末尾元素
    cur.cnt++;
  }
  return ans;
};

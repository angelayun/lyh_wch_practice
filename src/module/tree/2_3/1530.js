var countPairs = function (root, distance) {
  let ans = 0;

  const dfs = function (node) {
    if (!node) return [];
    // 遇到叶子节点，记录一个长度为 1 的路径
    if (node.left == node.right) return [1];

    const l = dfs(node.left);
    const r = dfs(node.right);

    // 遍历左右子树中“各个叶子节点”到“当前 root”的距离，相加就可以算出是不是好叶子节点
    l.forEach((item1) => {
      r.forEach((item2) => {
        if (item1 + item2 <= distance) {
          ans++;
        }
      });
    });

    // 递归向上归时，“每个叶子节点”到“当前 root”的距离都要+1
    return [...l, ...r].map((i) => i + 1);
  };
  dfs(root);

  return ans;
};

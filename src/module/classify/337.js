function dfs(node) {
  if (node === null) { // 递归边界
    return [0, 0]; // 没有节点，怎么选都是 0
  }
  const [lRob, lNotRob] = dfs(node.left); // 递归左子树
  const [rRob, rNotRob] = dfs(node.right); // 递归右子树
  const rob = lNotRob + rNotRob + node.val; // 选
  const notRob = Math.max(lRob, lNotRob) + Math.max(rRob, rNotRob); // 不选
  return [rob, notRob];
}

var rob = function (root) {
  return Math.max(...dfs(root)); // 根节点选或不选的最大值
};
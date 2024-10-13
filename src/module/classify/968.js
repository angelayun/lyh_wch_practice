function dfs(node) {
  if (node === null) {
    return [Infinity, 0, 0];
  }
  const [lChoose, lByFa, lByChildren] = dfs(node.left);
  const [rChoose, rByFa, rByChildren] = dfs(node.right);
  // 当前选了  不需要被子节点罩着了 在其它情况里面选一个最小值
  const choose = Math.min(lChoose, lByFa) + Math.min(rChoose, rByFa) + 1;
  // 
  const byFa = Math.min(lChoose, lByChildren) + Math.min(rChoose, rByChildren);
  // 
  const byChildren = Math.min(lChoose + rByChildren, lByChildren + rChoose, lChoose + rChoose);
  return [choose, byFa, byChildren];
}

var minCameraCover = function (root) {
  const [choose, , byChildren] = dfs(root);
  return Math.min(choose, byChildren);
};
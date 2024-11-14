// 106. 从中序与后序遍历序列构造二叉树
var buildTree = function (inorder, postorder) {
  const n = postorder.length;
  if (n === 0) {
    // 空节点
    return null;
  }
  // 中序  左根右
  // 后序  左右根
  const leftSize = inorder.indexOf(postorder[n - 1]); // 左子树的大小
  const in1 = inorder.slice(0, leftSize);
  const in2 = inorder.slice(leftSize + 1, n);
  const post1 = postorder.slice(0, leftSize);
  const post2 = postorder.slice(leftSize, n - 1);
  const left = buildTree(in1, post1);
  const right = buildTree(in2, post2);
  // 这下彻底对这个边界了解了
  return new TreeNode(postorder[n - 1], left, right);
};
var buildTree = function (inorder, postorder) {
  const n = inorder.length;
  const index = new Map();
  for (let i = 0; i < n; i++) {
    index.set(inorder[i], i);
  }

  function dfs(inL, inR, postL, postR) {
    if (postL === postR) {
      // 空节点
      return null;
    }
    const leftSize = index.get(postorder[postR - 1]) - inL; // 左子树的大小
    const left = dfs(inL, inL + leftSize, postL, postL + leftSize);
    const right = dfs(inL + leftSize + 1, inR, postL + leftSize, postR - 1);
    return new TreeNode(postorder[postR - 1], left, right);
  }
  return dfs(0, n, 0, n); // 左闭右开区间
};

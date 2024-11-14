// 889. 根据前序和后序遍历构造二叉树
var constructFromPrePost = function (preorder, postorder) {
  const n = preorder.length;
  if (n === 0) {
    // 空节点
    return null;
  }
  if (n === 1) {
    // 叶子节点
    return new TreeNode(preorder[0]);
  }
  const leftSize = postorder.indexOf(preorder[1]) + 1; // 左子树的大小
  const pre1 = preorder.slice(1, 1 + leftSize);
  const pre2 = preorder.slice(1 + leftSize);
  const post1 = postorder.slice(0, leftSize);
  const post2 = postorder.slice(leftSize, n - 1);
  const left = constructFromPrePost(pre1, post1);
  const right = constructFromPrePost(pre2, post2);
  return new TreeNode(preorder[0], left, right);
};

var constructFromPrePost = function (preorder, postorder) {
  const n = preorder.length;
  const index = Array(n + 1);
  for (let i = 0; i < n; i++) {
    index[postorder[i]] = i;
  }

  // 注意 postR 可以省略
  function dfs(preL, preR, postL) {
    if (preL === preR) {
      // 空节点
      return null;
    }
    if (preL + 1 === preR) {
      // 叶子节点
      return new TreeNode(preorder[preL]);
    }
    const leftSize = index[preorder[preL + 1]] - postL + 1; // 左子树的大小
    const left = dfs(preL + 1, preL + 1 + leftSize, postL);
    const right = dfs(preL + 1 + leftSize, preR, postL + leftSize);
    return new TreeNode(preorder[preL], left, right);
  }
  return dfs(0, n, 0); // 左闭右开区间
};

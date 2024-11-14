// 105. 从前序与中序遍历序列构造二叉树
var buildTree = function (preorder, inorder) {
  const n = preorder.length;
  if (n === 0) {
    // 空节点
    return null;
  }
  const leftSize = inorder.indexOf(preorder[0]); // 左子树的大小
  // slice 是左闭右开的
  const pre1 = preorder.slice(1, 1 + leftSize);
  const pre2 = preorder.slice(1 + leftSize);
  const in1 = inorder.slice(0, leftSize);
  const in2 = inorder.slice(1 + leftSize, n);
  const left = buildTree(pre1, in1);
  const right = buildTree(pre2, in2);
  return new TreeNode(preorder[0], left, right);
};

var buildTree = function (preorder, inorder) {
  const n = preorder.length;
  const index = new Map();
  for (let i = 0; i < n; i++) {
    index.set(inorder[i], i);
  }

  function dfs(preL, preR, inL, inR) {
    if (preL === preR) {
      // 空节点
      return null;
    }
    const leftSize = index.get(preorder[preL]) - inL; // 左子树的大小
    const left = dfs(preL + 1, preL + 1 + leftSize, inL, inL + leftSize);
    const right = dfs(preL + 1 + leftSize, preR, inL + 1 + leftSize, inR);
    return new TreeNode(preorder[preL], left, right);
  }
  return dfs(0, n, 0, n); // 左闭右开区间
};

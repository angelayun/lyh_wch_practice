/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  let res = [];
  // 存储目标节点的爸爸
  let parentNode;
  const dfs = (root, target, father) => {
    if (root == null) return false;
    if (root == target) {
      // 如果搜到了目标节点，那么它爸爸就是新树的根
      parentNode = father;
      return true;
    }
    if (dfs(root.left, target, root)) {
      root.left = father;
      return true;
    }
    if (dfs(root.right, target, root)) {
      root.right = father;
      return true;
    }
    return false;
  };
  const collect = (root, n, k) => {
    // 搜索以k为根节点的树的第k层的所有节点
    if (root == null) return;
    if (n == k) res.push(root.val);
    else {
      collect(root.left, n + 1, k);
      collect(root.right, n + 1, k);
    }
  };
  // 首先把树分成两棵  一棵以目标节点为根  一棵以目标节点爸爸为根
  dfs(root, target, null);
  // 搜索第一棵树中深度为k的节点
  collect(target, 0, k);
  // 搜索第二棵树深度为k-1的节点
  collect(parentNode, 0, k - 1);
  return res;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[][]} ops
 * @return {number}
 */
var getNumber = function (root, ops) {
  let ans = 0;
  const n = ops.length;
  // 从最后的操作往前冲，遇到红色的直接加1并结束，遇到蓝色的直接结束
  // 想象成坐标轴，最后的操作在最下面，往上冲，遇到的第一个颜色如果是红色+1，蓝色结束。

  
  // 从后往前，只要找到一个染色的就break  如果染的是红色就统计数量
  const check = (root) => {
    for (let i = n - 1; i >= 0; i--) {
      const [type, x, y] = ops[i];
      if (type == 1 && root.val >= x && root.val <= y) {
        ans++;
        break;
      }
      if (type == 0 && root.val >= x && root.val <= y) {
        break;
      }
    }
  };
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    check(root);
    dfs(root.right);
  };
  dfs(root);
  return ans;
};

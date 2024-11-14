/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findFrequentTreeSum = function (root) {
  let sumToCount = new Map();
  // 定义：输入一个节点，返回以该节点为根的二叉树所有节点之和
  let sum = (root) => {
    if (root == null) return 0;
    let leftSum = sum(root.left);
    let rightSum = sum(root.right);
    let res = root.val + leftSum + rightSum;
    // 后序遍历位置，顺手记录子树和对应的频率
    sumToCount.set(res, (sumToCount.get(res) || 0) + 1);
    return res;
  };
  // 遍历二叉树，记录所有子树和及出现频率
  sum(root);
  // 找到最大的出现频率
  let maxCount = Math.max(...sumToCount.values());
  // 找到最大出现频率对应的的子树和
  let res = [];
  for (let [key, value] of sumToCount) {
    if (value == maxCount) {
      res.push(key);
    }
  }
  return res;
};

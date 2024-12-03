// 递归的思路
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
  // 先把两颗二叉树中序遍历   从小到大 存储
  let path = [];
  const dfs = (node) => {
    if (node == null) return;
    dfs(node.left);
    path.push(node.val);
    dfs(node.right);
  };
  dfs(root1);
  let arr1 = path.slice();
  path = [];
  dfs(root2);
  let arr2 = path.slice();
  let ans = [];
  // 然后按照88题合并两个数组  题意并没有说要去重
  let i = 0,
    j = 0;
  while (i < arr1.length || j < arr2.length) {
    if (i >= arr1.length) {
      ans.push(...arr2.slice(j));
      break;
    } else if (j >= arr2.length) {
      ans.push(...arr1.slice(i));
      break;
    } else if (arr1[i] < arr2[j]) {
      ans.push(arr1[i++]);
    } else {
      ans.push(arr2[j++]);
    }
  }
  return ans;
};

// 迭代的思路
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
  let stack1 = [];
  let stack2 = [];
  let ans = [];
  while (root1 || stack1.length || root2 || stack2.length) {
    while (root1) {
      stack1.push(root1);
      root1 = root1.left;
    }
    while (root2) {
      stack2.push(root2);
      root2 = root2.left;
    }
    if (stack1.length <= 0) {
      root2 = stack2.pop();
      ans.push(root2.val);
      root2 = root2.right;
    } else if (stack2.length <= 0) {
      root1 = stack1.pop();
      ans.push(root1.val);
      root1 = root1.right;
    } else if (stack1[stack1.length - 1].val < stack2[stack2.length - 1].val) {
      root1 = stack1.pop();
      ans.push(root1.val);
      root1 = root1.right;
    } else {
      root2 = stack2.pop();
      ans.push(root2.val);
      root2 = root2.right;
    }
  }
  return ans;
};

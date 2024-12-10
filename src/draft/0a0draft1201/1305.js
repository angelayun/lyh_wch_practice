// 两种思路  1 dfs把值放到arr中  然后按照88题目合并有序数组
// 2 栈的方式 有序的放入
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
  const dfs = (node, arr) => {
    if (node == null) return;
    dfs(node.left, arr);
    arr.push(node.val);
    dfs(node.right, arr);
  };
  let arr1 = [];
  dfs(root1, arr1);
  let arr2 = [];
  dfs(root2, arr2);
  let arr = [];
  let i = 0,
    j = 0;
  while (i < arr1.length || j < arr2.length) {
    if (i >= arr1.length) {
      arr.push(...arr2.slice(j));
      break;
    } else if (j >= arr2.length) {
      arr.push(...arr1.slice(i));
      break;
    } else if (arr1[i] < arr2[j]) {
      arr.push(arr1[i++]);
    } else {
      arr.push(arr2[j++]);
    }
  }
  return arr;
};

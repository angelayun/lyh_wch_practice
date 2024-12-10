/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (postorder == '') return null;
  let rootVal = postorder[postorder.length - 1];
  let rootIndex = inorder.indexOf(rootVal);
  let leftPost = postorder.slice(0, rootIndex);
  let rightPost = postorder.slice(rootIndex, postorder.length - 1);
  let leftIn = inorder.slice(0, rootIndex);
  let rightIn = inorder.slice(rootIndex + 1);
  return new TreeNode(
    rootVal,
    buildTree(leftIn, leftPost),
    buildTree(rightIn, rightPost)
  );
};

/**
 * // Definition for a QuadTree node.
 * function _Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */

/**
 * @param {_Node} quadTree1
 * @param {_Node} quadTree2
 * @return {_Node}
 */
var intersect = function (quadTree1, quadTree2) {
  // quadTree1是叶子节点
  if (quadTree1.isLeaf) {
    // 值是true
    if (quadTree1.val) {
      return new Node(true, true, null, null, null, null);
    }
    return quadTree2;
  }
  if (quadTree2.isLeaf) {
    if (quadTree2.val) {
      return new Node(true, true, null, null, null, null);
    }
    return quadTree1;
  }
  // 都不是叶子节点
  let topLeft = intersect(quadTree1.topLeft, quadTree2.topLeft);
  let topRight = intersect(quadTree1.topRight, quadTree2.topRight);
  let bottomLeft = intersect(quadTree1.bottomLeft, quadTree2.bottomLeft);
  let bottomRight = intersect(quadTree1.bottomRight, quadTree2.bottomRight);
  // 四个子节点都是叶子节点并且值相同
  if (
    topLeft.isLeaf &&
    topRight.isLeaf &&
    bottomLeft.isLeaf &&
    bottomRight.isLeaf &&
    topLeft.val == topRight.val &&
    topLeft.val == bottomLeft.val &&
    topLeft.val == bottomRight.val
  ) {
    return new Node(topLeft.val, true, null, null, null, null);
  }
  return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
};

/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
  let stack = [];
  preorder = preorder.split(',');
  for (let node of preorder) {
    stack.push(node);
    while (
      stack.length >= 3 &&
      stack[stack.length - 1] == '#' &&
      stack[stack.length - 2] == stack[stack.length - 1] &&
      stack[stack.length - 3] != '#'
    ) {
      stack.pop();
      stack.pop();
      stack.pop();
      stack.push('#');
    }
  }
  return stack.length == 1 && stack.pop() == '#';
};
/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
  let nodes = preorder.split(',');
  // 根节点的入度为0
  let diff = 1;
  for (let node of nodes) {
    // 入度为1
    diff -= 1;
    if (diff < 0) {
      return false;
    }
    if (node != '#') {
      // 出度为2
      diff += 2;
    }
  }
  return diff == 0;
};

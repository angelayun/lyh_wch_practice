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

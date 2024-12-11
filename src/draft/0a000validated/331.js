/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
  preorder = preorder.split(',');
  let stack = [];
  for (let node of stack) {
    stack.push(node);
    while (
      stack.length >= 3 &&
      stack[stack.length - 1] == '#' &&
      stack[stack.length - 2] == '#' &&
      stack[stack.length - 3] != '#'
    ) {
      stack.pop();
      stack.pop();
      stack.pop();
      stack.push('#');
    }
  }
  return stack.length == 1 && stack[0] == '#';
};

/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
  preorder = preorder.split(',');
  let deg = 1;
  for (let node of preorder) {
    // 入度为1
    deg -= 1;
    if (deg < 0) {
      return false;
    }
    if (node != '#') {
      // 出度为2
      deg += 2;
    }
  }
  return deg == 0;
};

/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
  let stack = [];
  preorder = preorder.split(',');
  for (let x of preorder) {
    stack.push(x);
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
  let degree = 1;
  preorder = preorder.split(',');
  for (let x of preorder) {
    degree -= 1;
    if (degree < 0) {
      return false;
    }
    if (x != '#') {
      degree += 2;
    }
  }
  return degree == 0;
};

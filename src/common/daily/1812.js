/**
 * @param {string} coordinates
 * @return {boolean}
 */
var squareIsWhite = function (coordinates) {
  let [col, row] = coordinates;
  col = col.charCodeAt() - 'a'.charCodeAt();
  return col % 2 == row % 2
  // return (col % 2 == 1 && col % 2 == row % 2)  ||  (col % 2 == 0 && col % 2 == row % 2);
};

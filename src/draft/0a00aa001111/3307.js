/**
 * @param {number} k
 * @param {number[]} operations
 * @return {character}
 */
var kthCharacter = function (k, operations) {
  if (operations.length == 0) return 'a';
  let op = operations.pop();
  let m = 1 << operations.length;
  if (k <= m) {
    return kthCharacter(k, operations);
  } else {
    let ans = kthCharacter(k - m, operations);
    return String.fromCharCode(
      ((ans.charCodeAt() - 'a'.charCodeAt() + op) % 26) + 'a'.charCodeAt()
    );
  }
};

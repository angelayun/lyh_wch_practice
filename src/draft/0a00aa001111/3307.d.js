/**
 * @param {number} k
 * @param {number[]} operations
 * @return {character}
 */
var kthCharacter = function (k, operations) {
  if (operations.length == 0) return 'a';
  k = BigInt(k);
  let op = operations.pop();
  let m = 1n << BigInt(operations.length);
  if (k <= m) return kthCharacter(Number(k), operations);
  else {
    let ans = kthCharacter(Number(k - m), operations);
    return String.fromCharCode(
      ((ans.charCodeAt - 'a'.charCodeAt() + op) % 26) + 'a'.charCodeAt()
    );
  }
};

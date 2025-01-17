/**
 * @param {number[][]} bottomLeft
 * @param {number[][]} topRight
 * @return {number}
 */
var largestSquareArea = function (bottomLeft, topRight) {
  let ans = 0n;
  for (let i = 0; i < bottomLeft.length; i++) {
    let b1 = bottomLeft[i];
    let t1 = topRight[i];
    for (let j = i + 1; j < bottomLeft.length; j++) {
      let b2 = bottomLeft[j];
      let t2 = topRight[j];
      let height = Math.min(t1[1], t2[1]) - Math.max(b1[1], b2[1]);
      let width = Math.min(t1[0], t2[0]) - Math.max(b1[0], b2[0]);
      let size = Math.min(width, height);
      if (size > 0 && BigInt(size * size) > ans) {
        ans = BigInt(size * size);
      }
    }
  }
  return Number(ans);
};

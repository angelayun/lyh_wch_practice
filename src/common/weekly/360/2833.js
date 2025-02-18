/**
 * @param {string} moves
 * @return {number}
 */
var furthestDistanceFromOrigin = function(moves) {
  let cnt = 0
  let cnt_=0
  for (let x of moves) {
    if (x == '_') cnt_++
    else if (x == 'R') cnt++
    else cnt--
  }
  return Math.abs(cnt) + cnt_
};
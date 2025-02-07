/**
 * @param {number[]} ranks
 * @param {character[]} suits
 * @return {string}
 */
var bestHand = function (ranks, suits) {
  let set = new Set(suits);
  if (set.size == 1) {
    return 'Flush';
  }
  let cnt = new Map();
  for (let r of ranks) {
    cnt.set(r, (cnt.get(r) || 0) + 1);
  }
  let maxVal = Math.max(...cnt.values());
  set = new Set(ranks);
  if (maxVal >= 3) return 'Three of a Kind';
  if (maxVal == 2) return 'Pair';
  return 'High Card';
};

// 优化写法
/**
 * @param {number[]} ranks
 * @param {character[]} suits
 * @return {string}
 */
var bestHand = function (ranks, suits) {
  let set = new Set(suits);
  if (set.size == 1) {
    return 'Flush';
  }
  let cnt = new Map();
  let pair = false
  for (let r of ranks) {
    cnt.set(r, (cnt.get(r) || 0) + 1);
    if (cnt.get(r) >= 3) return 'Three of a Kind';
    if (cnt.get(r) == 2) {
      pair=true
    }
  }

  return pair?'Pair': 'High Card';
};

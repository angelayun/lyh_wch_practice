/**
 * @param {number[]} cards
 * @return {number}
 */
var minimumCardPickup = function (cards) {
  let cnt = new Map();
  let res = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < cards.length; i++) {
    let x = cards[i];
    if (cnt.has(x)) {
      res = Math.min(i - cnt.get(x) + 1, res);
    }
    cnt.set(x, i);
  }
  return res == Number.MAX_SAFE_INTEGER ? -1 : res;
};

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  let left = 1, right = Math.max(...piles)
  const eatHours = (n) => {
    let count = 0
    for (let p of piles) {
      count += Math.ceil(p / n)
    }
    return count
  }
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (eatHours(mid) < h) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left
};
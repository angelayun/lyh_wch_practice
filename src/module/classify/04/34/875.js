/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  // 每小时最少吃0  最多吃 
  let left = 1, right = Math.max(...piles)
  const n = piles.length
  let canEat = (item) => {
    let count = 0
    for (let x of piles) {
      count += Math.ceil(x / item)
    }
    return count
  }
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (canEat(mid) <= h) {
      right = mid - 1;
    } else {
      left = mid + 1
    }
  }
  return left;
};
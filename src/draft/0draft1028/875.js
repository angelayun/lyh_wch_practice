const needHours = (piles, speed) => {
  // 以speed速度来吃香蕉，需要花多长时间
  let h = 0;
  for (let x of piles) {
    h += Math.ceil(x / speed);
  }
  return h;
};
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  // 最小速度是left  最大速度是right
  let left = 1,
    right = Math.max(...piles);
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (needHours(mid) < h) {
      // 这个速度能吃完
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

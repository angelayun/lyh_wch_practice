/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var flowerGame = function (n, m) {
  // [1,n]中偶数个数  Math.floor(n/2)  [1,n]中奇数个数 Math.ceil(n/2)
  // 题目的本质是 x+y 要是奇数 alice就赢得比赛
  // 奇数+偶数  就是奇数  或者偶数+奇数 就是奇数
  return (
    Math.ceil(n / 2) * Math.floor(m / 2) + Math.floor(n / 2) * Math.ceil(m / 2)
  );
};

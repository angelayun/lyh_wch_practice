/**
 * @param {number[]} candiesCount
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var canEat = function (candiesCount, queries) {
  let types = candiesCount.length; //糖果的类型数
  let sum = new Array(types).fill(0n);
  sum[0] = BigInt(candiesCount[0]);
  for (let i = 1; i < types; i++) {
    sum[i] = sum[i - 1] + BigInt(candiesCount[i]); //计算前缀和，也就是计算在吃完指定类型的糖之前一共要吃掉多少颗糖
  }
  let n = queries.length;
  // boolean[] res = new boolean[n];
  let res = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    //指定的糖果类型
    let [type, day, num] = queries[i];
    //题目要求第几天要吃到指定类型的糖
    day = BigInt(type);
    //每天吃糖的上限
    num = BigInt(num);
    //以最快的速度吃，看多久能进入战斗，也就是什么时候吃到第一颗指定类型的糖
    let min = (sum[type] - BigInt(candiesCount[type])) / num;
    //以最慢的速度吃，看战线能拉多长，也就是什么时候把最后一颗指定类型的吃完
    let max = sum[type] - 1n;

    res[i] = min <= day && day <= max;
  }
  return res;
};

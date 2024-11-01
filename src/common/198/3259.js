/**
 * @param {number[]} energyDrinkA
 * @param {number[]} energyDrinkB
 * @return {number}
 */
var maxEnergyBoost = function (energyDrinkA, energyDrinkB) {
  const n = energyDrinkA.length;
  let c = [energyDrinkA, energyDrinkB];
  let memo = Array.from({ length: n }, () => new Array(2).fill(-1));
  const dfs = (i, j) => {
    // j为0表示选择energyDrinkA  否则表示选择energyDrinkB
    if (i < 0) return 0;
    if (memo[i][j] != -1) return memo[i][j];
    return (memo[i][j] =
      Math.max(
        // 选择a中的元素
        dfs(i - 1, j),
        // 选择b中的元素
        dfs(i - 2, j ^ 1)
      ) + c[j][i]);
  };
  return Math.max(dfs(n - 1, 0), dfs(n - 1, 1));
};

/**
 * @param {number[]} energyDrinkA
 * @param {number[]} energyDrinkB
 * @return {number}
 */
var maxEnergyBoost = function (energyDrinkA, energyDrinkB) {
  const n = energyDrinkA.length;
  let c = [energyDrinkA, energyDrinkB];
  let dp = Array.from({ length: n + 2 }, () => new Array(2).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 2; j++) {
      dp[i + 2][j] = Math.max(dp[i + 1][j], dp[i][j ^ 1]) + c[j][i];
    }
  }
  return Math.max(dp[n + 1][0], dp[n + 1][1]);
};

/* var maxEnergyBoost = function (energyDrinkA, energyDrinkB) {
  const n = energyDrinkA.length;
  let c = [energyDrinkA, energyDrinkB];
  let dp = Array.from({ length: 2 }, () => new Array(2).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 2; j++) {
      dp[(i + 2) % 2][j] =
        Math.max(dp[(i + 1) % 2][j], dp[i % 2][j ^ 1]) + c[j][i];
    }
  }
  return Math.max(dp[(n + 1) % 2][0], dp[(n + 1) % 2][1]);
}; */

/**
 * @param {number[]} energyDrinkA
 * @param {number[]} energyDrinkB
 * @return {number}
 */
/* var maxEnergyBoost = function (energyDrinkA, energyDrinkB) {
  const n = energyDrinkA.length;
  let c = [energyDrinkA, energyDrinkB];
  let dp = Array.from({ length: 2 }, () => new Array(2).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 2; j++) {
      dp[(i + 2) % 2][j] =
        Math.max(dp[(i + 1) % 2][j], dp[i % 2][j ^ 1]) + c[j][i];
    }
  }
  return Math.max(dp[(n + 1) % 2][0], dp[(n + 1) % 2][1]);
}; */
// 上面滚动数组的没过，哎
/**
 * @param {number[]} energyDrinkA
 * @param {number[]} energyDrinkB
 * @return {number}
 */
var maxEnergyBoost = function (energyDrinkA, energyDrinkB) {
  const n = energyDrinkA.length;
  let dpa1 = energyDrinkA[0],
    dpa2 = energyDrinkA[1] + dpa1;
  let dpb1 = energyDrinkB[0],
    dpb2 = energyDrinkB[1] + dpb1;
  for (let i = 2; i < n; i++) {
    let dpa3 = Math.max(dpa2, dpb1) + energyDrinkA[i];
    let dpb3 = Math.max(dpb2, dpa1) + energyDrinkB[i];
    dpa1 = dpa2;
    dpa2 = dpa3;

    dpb1 = dpb2;
    dpb2 = dpb3;
  }
  return Math.max(dpb2, dpa2);
};

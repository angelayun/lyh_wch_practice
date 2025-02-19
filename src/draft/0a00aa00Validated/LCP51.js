/**
 * @param {number[]} materials
 * @param {number[][]} cookbooks
 * @param {number[][]} attribute
 * @param {number} limit
 * @return {number}
 */
var perfectMenu = function (materials, cookbooks, attribute, limit) {
  let ans = -1;
  const n = cookbooks.length;
  const dfs = (i, taste, endurance) => {
    if (i == n) {
      if (endurance >= limit) {
        ans = Math.max(ans, taste);
      }
      return;
    }
    // 不选的情况
    dfs(i + 1, taste, endurance);
    // 是否满足制作的条件
    let isCanCook = true;
    for (let j = 0; j < materials.length; j++) {
      if (materials[j] < cookbooks[i][j]) {
        isCanCook = false;
        break;
      }
    }
    if (isCanCook) {
      for (let j = 0; j < materials.length; j++) {
        materials[j] -= cookbooks[i][j];
      }
      dfs(i + 1, taste + attribute[i][0], endurance + attribute[i][1]);
      for (let j = 0; j < materials.length; j++) {
        materials[j] += cookbooks[i][j];
      }
    }
  };
  dfs(0, 0, 0);
  return ans;
};

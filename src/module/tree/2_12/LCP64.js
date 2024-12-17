/**
 * @param {TreeNode} root
 * @return {number}
 */
var closeLampInTree = function (root) {
  let map = new Map();
  const dfs = (node, switch2Stat, switch3Stat) => {
    if (node == null) return 0;
    let memoKey = `${switch2Stat}_${switch3Stat}`;
    if (map.has(node)) {
      if (map.get(node).has(memoKey)) {
        return map.get(node).get(memoKey);
      }
    } else {
      map.set(node, new Map());
    }

    let result = 0;
    //灯 开 的情况 , 对于开关 2 和 开关 3 可以相互抵消 , 最终还是 开
    //灯 关 的情况 , 对于开关 2 和 开关 3 可以无法抵消 , 最终还是 开

    if ((node.val == 1) == (switch2Stat == switch3Stat)) {
      //枚举打开一个开关 或者打开三个开关的情况
      let res1 =
        // 按的开关1
        dfs(node.left, switch2Stat, false) +
        dfs(node.right, switch2Stat, false) +
        1;

      let res2 =
        // 按的开关2
        dfs(node.left, !switch2Stat, false) +
        dfs(node.right, !switch2Stat, false) +
        1;

      let res3 =
        // 按的开关3
        dfs(node.left, switch2Stat, true) +
        dfs(node.right, switch2Stat, true) +
        1;

      let res123 =
        // 3个开关都开
        dfs(node.left, !switch2Stat, true) +
        dfs(node.right, !switch2Stat, true) +
        3;
      result = Math.min(res1, res2, res3, res123);
    } else {
      //枚举一个都不开 或 打开两个开关
      let res0 =
        dfs(node.left, switch2Stat, false) +
        dfs(node.right, switch2Stat, false);

      let res12 =
        dfs(node.left, !switch2Stat, false) +
        dfs(node.right, !switch2Stat, false) +
        2;

      let res13 =
        dfs(node.left, switch2Stat, true) +
        dfs(node.right, switch2Stat, true) +
        2;

      let res23 =
        dfs(node.left, !switch2Stat, true) +
        dfs(node.right, !switch2Stat, true) +
        2;
      result = Math.min(res0, res12, res13, res23);
    }
    let innerMap = map.get(node);
    innerMap.set(memoKey, result);
    return result;
  };
  return dfs(root, false, false);
};

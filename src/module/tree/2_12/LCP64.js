/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var closeLampInTree = function (root) {
  //任意一个节点
  //会受到的影响
  //其祖先节点开关2 的切换次数 偶数 为 不切换 奇数为切换
  //其父节点是否是否切换了开关3
  let map = new Map();
  const dfs = (node, switch2Stat, switch3Stat) => {
    if (node == null) return 0;

    let x = switch2Stat ? 1 : 0;
    let y = switch3Stat ? 1 : 0;
    let val = Array.from({ length: 2 }, () => new Array(2).fill(0));
    if (map.has(node)) {
      val = map.get(node);

      if (val[x][y] > 0) return val[x][y];
    } else {
      map.set(node, val);
    }

    let result = 0;
    //灯 开 的情况 , 对于开关 2 和 开关 3 可以相互抵消 , 最终还是 开
    //灯 关 的情况 , 对于开关 2 和 开关 3 可以无法抵消 , 最终还是 开

    if ((node.val == 1) == (switch2Stat == switch3Stat)) {
      //枚举打开一个开关 或者打开三个开关的情况
      let res1 =
        dfs(node.left, switch2Stat, false) +
        dfs(node.right, switch2Stat, false) +
        1;
      result = res1;

      let res2 =
        dfs(node.left, !switch2Stat, false) +
        dfs(node.right, !switch2Stat, false) +
        1;
      result = res2 < result ? res2 : result;

      let res3 =
        dfs(node.left, switch2Stat, true) +
        dfs(node.right, switch2Stat, true) +
        1;
      result = res3 < result ? res3 : result;

      let res123 =
        dfs(node.left, !switch2Stat, true) +
        dfs(node.right, !switch2Stat, true) +
        3;
      result = result < res123 ? result : res123;

      val[x][y] = result;
    } else {
      //枚举一个都不开 或 打开两个开关
      let res0 =
        dfs(node.left, switch2Stat, false) +
        dfs(node.right, switch2Stat, false);
      result = res0;

      let res12 =
        dfs(node.left, !switch2Stat, false) +
        dfs(node.right, !switch2Stat, false) +
        2;
      result = res12 < result ? res12 : result;

      let res13 =
        dfs(node.left, switch2Stat, true) +
        dfs(node.right, switch2Stat, true) +
        2;
      result = result < res13 ? result : res13;

      let res23 =
        dfs(node.left, !switch2Stat, true) +
        dfs(node.right, !switch2Stat, true) +
        2;
      result = result < res23 ? result : res23;

      val[x][y] = result;
    }
    map.set(node, val);
    return val[x][y];
  };
  return dfs(root, false, false);
};

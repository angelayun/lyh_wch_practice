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
  let map = new Map();
  const dfs = (root, switch2, switch3) => {
    if (root == null) return 0;
    let mapKey = `${switch2}_${switch3}`;
    if (map.has(root)) {
      if (map.get(root).has(mapKey)) {
        return map.get(root).get(mapKey);
      }
    } else {
      map.set(root, new Map());
    }
    if ((root.val == 1) == (switch2 == switch3)) {
      // 如果灯开 互相抵消  还是开
      // 如果灯关 互相抵消不了  还是开
      // 关一个灯或者  关3次
      let res1 =
        dfs(root.left, switch2, false) + dfs(root.right, switch2, false) + 1;
      let res2 =
        dfs(root.left, !switch2, false) + dfs(root.right, !switch2, false) + 1;
      let res3 =
        dfs(root.left, switch2, true) + dfs(root.right, switch2, true) + 1;
      let res123 =
        dfs(root.left, !switch2, true) + dfs(root.right, !switch2, true) + 3;
      let res = Math.min(res1, res2, res3, res123);
      map.get(root).set(mapKey, res);
      return res;
    } else {
      // 一个灯也不按 或者按两个
      let res0 =
        dfs(root.left, switch2, false) + dfs(root.right, switch2, false);
      let res12 =
        dfs(root.left, !switch2, false) + dfs(root.right, !switch2, false) + 2;
      let res13 =
        dfs(root.left, switch2, true) + dfs(root.right, switch2, true) + 2;
      let res23 =
        dfs(root.left, !switch2, true) + dfs(root.right, !switch2, true) + 2;

      let res = Math.min(res0, res12, res13, res23);
      map.get(root).set(mapKey, res);
      return res;
    }
  };
  return dfs(root, false, false);
};

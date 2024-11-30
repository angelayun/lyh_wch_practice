var amountOfTime = function (root, start) {
  let ans = 0;
  function dfs(node) {
    if (node === null) {
      return [0, false];
    }
    const [lLen, lFound] = dfs(node.left);
    const [rLen, rFound] = dfs(node.right);
    if (node.val === start) {
      // 计算子树 start 的最大深度
      // 注意这里和方法一的区别，max 后面没有 +1，所以算出的也是最大深度
      ans = Math.max(lLen, rLen);
      return [1, true]; // 找到了 start
    }
    if (lFound || rFound) {
      // 只有在左子树或右子树包含 start 时，才能更新答案
      ans = Math.max(ans, lLen + rLen); // 两条链拼成直径
      // 保证 start 是直径端点
      return [(lFound ? lLen : rLen) + 1, true];
    }
    return [Math.max(lLen, rLen) + 1, false];
  }
  dfs(root);
  return ans;
};

var amountOfTime = function (root, start) {
  let ans = 0;
  function dfs(node) {
    if (node === null) {
      return 0;
    }
    const lLen = dfs(node.left);
    const rLen = dfs(node.right);
    if (node.val === start) {
      // 计算子树 start 的最大深度
      ans = -Math.min(lLen, rLen); // 负负得正
      return 1; // 用正数表示找到了 start
    }
    if (lLen > 0 || rLen > 0) {
      // 只有在左子树或右子树包含 start 时，才能更新答案
      ans = Math.max(ans, Math.abs(lLen) + Math.abs(rLen)); // 两条链拼成直径
      return Math.max(lLen, rLen) + 1; // max 会自动取到正数
    }
    return Math.min(lLen, rLen) - 1; // 用负数表示没有找到 start
  }
  dfs(root);
  return ans;
};

var getDirections = function (root, startValue, destValue) {
  let path = [];
  const dfs = (root, target) => {
    if (root == null) return false;
    if (root.val == target) return true;
    path.push('L');
    if (dfs(root.left, target)) {
      return true;
    }
    path.pop();
    path.push('R');
    if (dfs(root.right, target)) {
      return true;
    }
    path.pop();
    return false;
  };
  dfs(root, startValue);
  let startPath = path.slice();
  path = [];
  dfs(root, destValue);
  let destPath = path.slice();
  let k = 0;
  for (
    ;
    k < destPath.length && k < startPath.length && destPath[k] == startPath[k];
    k++
  );
  return 'U'.repeat(startPath.length - k) + destPath.slice(k).join('');
};

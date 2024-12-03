/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  let arr = [];
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    arr.push(root.val);
    dfs(root.right);
  };
  dfs(root)
  for (let left = 0, right = arr.length - 1; left < right; ) {
    let sum = arr[left] + arr[right];
    if (sum == k) return true;
    else if (sum < k) left++;
    else right--;
  }
  return false;
};

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  let set = new Set();
  let ans = false;
  const dfs = (root) => {
    if (root == null || ans) return;
    dfs(root.left);
    if (set.has(k - root.val)) {
      ans = true;
      return;
    }
    set.add(root.val);
    dfs(root.right);
  };
  dfs(root)
  return ans;
};
// 两种都待验证

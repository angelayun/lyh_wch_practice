var rangeSumBST = function (root, low, high) {
  if (root == null) return 0;
  // 这是反着的思路
  // 如果当前值比最大值还要大  说明只需要去左子树中查询
  if (root.val > high) return rangeSumBST(root.left, low, high);
  // 同理  如果当前值比最小值还要小  说明只需要去右子树中查询
  if (root.val < low) return rangeSumBST(root.right, low, high);
  // 两种情况都看一下
  return (
    rangeSumBST(root.left, low, high) +
    rangeSumBST(root.right, low, high) +
    root.val
  );
};

var rangeSumBST = function (root, low, high) {
  // 正着的思路
  if (root == null) return 0;
  let x = root.val;
  // 当前节点值在范围内  是>= <=
  let sum = x >= low && x <= high ? x : 0;
  if (x > low) {
    // 当前节点值比最小值要大  说明还有可能有值在左子树中  去左子树中看一看
    sum += rangeSumBST(root.left, low, high);
  }
  if (x < high) {
    // 同理  如果当前值比最大值要小  说明还有可能有值在右子树中  去右子树中看一看
    sum += rangeSumBST(root.right, low, high);
  }
  return sum;
};

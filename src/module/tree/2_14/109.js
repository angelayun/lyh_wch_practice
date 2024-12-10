/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  const build = (left, right) => {
    if (left > right) return null;
    let mid = left + ((right - left) >> 1);
    let leftNode = build(left, mid - 1);
    let rightNode = build(mid + 1, right);
    let newNode = new TreeNode(arr[mid], leftNode, rightNode);
    return newNode;
  };
  return build(0, arr.length - 1);
};
// 上面是常规写法
// 下面是快慢指针的写法
const sortedListToBST = (head) => {
  if (head == null) return null;
  let slow = head;
  let fast = head;
  let preSlow; // 保存slow的前一个节点

  while (fast && fast.next) {
    preSlow = slow; // 保存当前slow
    slow = slow.next; // slow走一步
    fast = fast.next.next; // fast走两步
  }
  const root = new TreeNode(slow.val); // 根据slow指向的节点值，构建节点

  if (preSlow != null) {
    // 如果preSlow有值，即slow左边有节点，需要构建左子树
    preSlow.next = null; // 切断preSlow和中点slow
    root.left = sortedListToBST(head); // 递归构建左子树
  }
  root.right = sortedListToBST(slow.next); // 递归构建右子树
  return root;
};

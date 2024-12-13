/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function (head) {
  // 创建两个虚拟头节点，分别用于存储小于 x 的节点和大于等于 x 的节点
  let left = new ListNode(-1);
  let right = new ListNode(-1);
  let pL = left;
  let pR = right;
  let isOdd = true;
  while (head) {
    // 如果当前节点的值小于x 将其添加到左边链表
    if (isOdd) {
      pL.next = head;
      pL = pL.next;
    } else {
      // 否则将其添加到右边链表
      pR.next = head;
      pR = pR.next;
    }
    // 移动到下一个节点
    head = head.next;
    isOdd = !isOdd;
  }
  // 右边链表的末尾指向null
  pR.next = null;
  // 将左边链表的末尾连接到右边链表的开头
  pL.next = right.next;
  // 返回重新组合后的左边链表节点
  return left.next;
};

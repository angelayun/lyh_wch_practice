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
var insertionSortList = function (head) {
  // 因为有可能后面的节点直接插入到head之前  所以声明一个哨兵节点
  let dummyNode = new ListNode(0, head);
  let cur = head;
  let prev = null;
  let temp = null;
  while (cur && cur.next) {
    // 前面比后面小
    if (cur.val <= cur.next.val) {
      cur = cur.next;
    } else {
      // 保存这个不正确排序的节点
      temp = cur.next;
      // 从当前链表中删除了它
      cur.next = cur.next.next;
      // 从头开始往后找  找到可以放乱序的节点
      prev = dummyNode;
      while (prev.next.val <= temp.val) {
        prev = prev.next;
      }
      // 因为temp.next马上 就有指向了 就不要考虑temp后面节点的事情
      temp.next = prev.next;
      prev.next = temp;
    }
  }
  return dummyNode.next;
};

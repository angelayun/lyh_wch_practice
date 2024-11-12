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
var swapPairs = function (head) {
  let dummnyNode = new ListNode(-1, head);
  let node0 = dummnyNode;
  let node1 = dummnyNode.next;
  while (node1 && node1.next) {
    let node2 = node1.next;
    // 这里不会报错  可能node3为空
    let node3 = node2.next;
    node0.next = node2;
    node2.next = node1;
    node1.next = node3;
    node0 = node1;
    node1 = node3;
  }
  return dummnyNode.next;
};

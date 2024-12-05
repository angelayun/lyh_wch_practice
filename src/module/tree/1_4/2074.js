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
var reverseEvenLengthGroups = function (head) {
  let nodes = [];
  for (let node = head, size = 1; node != null; node = node.next) {
    nodes.push(node);
    if (nodes.length == size || node.next == null) {
      // 统计到size个节点， 或到达链表末尾
      if (nodes.length % 2 == 0) {
        let n = nodes.length
        // 有偶数个节点
        for (let i = 0; i < n / 2; i++) {
          // 左右直接交换元素值
          [nodes[i].val, nodes[n - i - 1].val] = [
            nodes[n - i - 1].val,
            nodes[i].val,
          ];
        }
      }
      nodes = [];
      size++;
    }
  }
  return head;
};

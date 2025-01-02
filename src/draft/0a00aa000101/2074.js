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
  for (let node = head, size = 1; node; node = node.next) {
    nodes.push(head.val);
    if (node.next == null || nodes.length == size) {
      if (nodes.length % 2 == 0) {
        let left = 0,
          right = nodes.length - 1;
        while (left < right) {
          [nodes[left], nodes[right]] = [nodes[right], nodes[left]];
          left++;
          right--;
        }
      }
      size++;
      nodes = [];
    }
  }
  return head;
};

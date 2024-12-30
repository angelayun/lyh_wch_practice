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
    nodes.push(node);
    // 这一组满了  或者到链表最末尾了
    if (nodes.length == size || node.next == null) {
      if (size % 2 == 0) {
        let left = 0,
          right = nodes.length - 1;
        while (left < right) {
          [nodes[left].val, nodes[right].val] = [
            nodes[right].val,
            nodes[left].val,
          ];
          left++;
          right--;
        }
      }
      // 下一组的数量增加1
      size++;
    }
  }
  return head;
};

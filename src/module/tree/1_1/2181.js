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
var mergeNodes = function (head) {
  let newHead = new ListNode(-1);
  let p = newHead;
  // 上一个零的节点
  let pre = null,
    sum = 0;
  while (head) {
    if (head.val == 0) {
      // console.log('会进来几次呢')
      if (pre != null) {
        // console.log('这个会会会会会进来几次呢')

        let newNode = new ListNode(sum);
        p.next = newNode;
        p = p.next;
        pre = head;
        sum = 0;
      } else {
        pre = head;
        sum = 0;
      }
    } else {
      sum += head.val;
    }
    head = head.next;
  }
  return newHead.next;
};

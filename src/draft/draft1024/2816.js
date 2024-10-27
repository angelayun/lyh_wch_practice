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
var doubleIt = function (head) {
  // 我想到的思路还是反转  再遍历每个节点*2  
  const revertLink = (head) => {
    let prev = null, cur = head
    while (cur) {
      let next = cur.next;
      cur.next = prev
      prev = cur;
      cur = next;
    }
    return prev
  }
  head = revertLink(head)
  let carry = 0
  let dummyNode = new ListNode()
  let p = dummyNode
  while (carry || head) {
    let val = (head ? head.val * 2 : 0) + carry
    p.next = new ListNode(val % 10)
    carry = ~~(val / 10)
    if (head) {
      head = head.next;
    }
    p = p.next;
  }

  return revertLink(dummyNode.next)
};
const reverseList = (head) => {
  let prev = null,
    cur = head;
  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
};
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function (head) {
  head = reverseList(head);
  let dummyNode = new ListNode(-1, head);
  let p = dummyNode
  while (p) {
    
  }
};

let reverseLink = (head) => {
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
let getMid = (head) => {
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let half = getMid(head);
  let second = reverseLink(half);
  let first = head;
  while (first && second) {
    if (first.val != second.val) return false;

    first = first.next;
    second = second.next;
  }
  return true;
};

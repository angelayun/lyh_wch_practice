const reverseLink = (head) => {
  let prev = null;
  let cur = head;
  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
};
const getMid = (head) => {
  let fast = head;
  let slow = head;
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
  let first = head;
  let second = reverseLink(getMid(head));
  while (first && second) {
    if (first.val != second.val) return false;
    first = first.next;
    second = second.next;
  }
  return true;
};

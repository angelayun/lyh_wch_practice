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
 * @return {number}
 */
var pairSum = function (head) {
  let first = head;
  let second = reverseLink(getMid(head));
  let ans = Number.MIN_SAFE_INTEGER;
  while (first && second) {
    let sum = first.val + second.val;
    ans = Math.max(ans, sum);
    first = first.next;
    second = second.next;
  }
  return ans;
};

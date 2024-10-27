/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let findMid = (head) => {
    let fast = head, slow = head
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow
  }
  const reverseList = (head, right) => {
    let prev = null, cur = head
    while (cur != right) {
      let next = cur.next;
      cur.next = prev
      prev = cur;
      cur = next
    }
    return prev
  }
  let mid = findMid(head)
  let link = reverseList(head, right)
  while (head && link) {
    if (head.val != link.val) {
      return false
    }
    head = head.next;
    link = link.next
  }
  return true
};
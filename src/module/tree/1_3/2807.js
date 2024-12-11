/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
const gcd = (a, b) => {
  while (b != 0) {
    [a, b] = [b, a % b];
  }
  return a;
};
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertGreatestCommonDivisors = function (head) {
  // 在链表中插入最大公约数
  let p = head;
  while (p && p.next) {
    // 求出这俩的最大公约数
    let val = gcd(p.val, p.next.val);
    let newNode = new ListNode(val, p.next);
    p.next = newNode;
    p = p.next.next;
  }
  return head;
};

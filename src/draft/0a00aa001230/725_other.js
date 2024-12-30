/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function (head, k) {
  let p = head;
  let n = 0;
  while (p) {
    n++;
    p = p.next;
  }
  let itemCount = ~~(n / k);
  let remainder = n % k;
  let res = new Array(k).fill(null);
  let cur = head;
  for (let i = 0; i < k && cur; i++) {
    res[i] = cur;
    for (let j = 1; j < itemCount + (i < remainder ? 1 : 0); j++) {
      cur = cur.next;
    }
    let next = cur.next;
    cur.next = null;
    cur = next;
  }
  return res;
};

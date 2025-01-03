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
  let totalCount = 0;
  while (p) {
    p = p.next;
    totalCount++;
  }
  let itemCount = ~~(totalCount / k);
  let reminder = totalCount % k;
  let res = new Array(k).fill(null);
  for (let i = 0, cur = head; i < k && cur; i++) {
    res[i] = cur;
    let size = itemCount + (i < reminder ? 1 : 0);
    let j = 1;
    while (j < size) {
      j++;
      cur = cur.next;
    }
    let next = cur.next;
    cur.next = null;
    cur = next;
  }
  return res;
};

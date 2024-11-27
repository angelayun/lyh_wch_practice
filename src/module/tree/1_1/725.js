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
  let totalCount = 0;
  let p = head;
  while (p) {
    totalCount++;
    p = p.next;
  }
  // 每一项个数
  let itemCount = ~~(totalCount / k),
    // 前splus项多1个
    remainder = totalCount % k;
  let parts = new Array(k).fill(null);
  let cur = head;
  for (let i = 0; i < k && cur != null; i++) {
    parts[i] = cur;
    let partSize = itemCount + (i < remainder ? 1 : 0);
    for (let j = 1; j < partSize; j++) {
      cur = cur.next;
    }
    let next = cur.next;
    cur.next = null;
    cur = next;
  }
  return parts;
};

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function (head, k) {
  // 先统计数量
  let p = head;
  let totalCount = 0;
  while (p) {
    totalCount++;
    p = p.next;
  }
  // 每一部分是多少个
  let itemCount = ~~(totalCount / k);
  // 前几段需要多增加1
  let remainder = totalCount % k;
  let parts = Array.from({ length: k }, () => []);
  let cur = head;
  for (let i = 0; i < k && cur; i++) {
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

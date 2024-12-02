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
    p = p.next;
    totalCount++;
  }
  // 每一部分是多少个
  let itemCount = ~~(totalCount / k);
  // 前几段需要多增加1
  let reminder = totalCount % k;
  let parts = new Array(k);
  let cur = head;
  for (let i = 0; i < k; i++) {
    parts[i] = cur;
    let curCount = itemCount + (i < reminder ? 1 : 0);
    for (let j = 0; j < curCount; i++) {
      cur = cur.next;
    }
    let next = cur.next;
    cur.next = null;
    cur = next;
  }
  return parts;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function (head) {
  let firstIndex = -1,
    lastIndex = -1;
  let preIndex = -1;
  let pre = head;
  let cur = head.next;
  let index = 0;
  let minDist = Number.MAX_SAFE_INTEGER;
  while (cur) {
    index++;
    if (cur.next) {
      if (
        (cur.val > pre.val && cur.val > cur.next.val) ||
        (cur.val < pre.val && cur.val < cur.next.val)
      ) {
        if (firstIndex == -1) firstIndex = index;
        else {
          if (preIndex != -1) {
            minDist = Math.min(minDist, index - preIndex);
          }
          lastIndex = index;
        }
        preIndex = index;
      }
    }
    pre=cur
    cur = cur.next;
  }
  if (firstIndex != -1 && lastIndex != -1) {
    return [minDist, lastIndex - firstIndex];
  } else {
    return [-1, -1];
  }
};

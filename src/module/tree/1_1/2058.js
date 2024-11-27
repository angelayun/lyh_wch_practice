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
  let minDistance = Number.MAX_SAFE_INTEGER;
  // 上一个遍历到的节点
  let pre = null;
  // 当前是属于链表的第几个节点
  let count = 1;
  // 第一个临界值的位置
  let firstDist = -1,
    // 上一个临界值的位置
    preDist = -1;
  while (head && head.next) {
    if (pre) {
      if (
        (head.val > pre.val && head.val > head.next.val) ||
        (head.val < pre.val && head.val < head.next.val)
      ) {
        // 局部极大值 | 局部最小值
        if (firstDist == -1) {
          firstDist = count;
        } else {
          minDistance = Math.min(minDistance, count - preDist);
        }
        preDist = count;
      }
    }
    pre = head;
    head = head.next;
    count++;
  }
  if (firstDist != -1 && firstDist != preDist) {
    // 最大距离其实就是 最后一临界值所在位置  - 第一个临界值所在位置
    return [minDistance, preDist - firstDist];
  }
  return [-1, -1];
};

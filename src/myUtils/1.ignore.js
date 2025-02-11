import { PriorityQueue } from '@datastructures-js/priority-queue';
function ListNode(val, next) {
  this.val = val;
  this.next = next;
}
/* export var mergeKLists = function (lists) {
  const pq = new PriorityQueue((a, b) => a - b);
  for (const head of lists) {
    if (head) {
      pq.enqueue(head);
    }
  }

  const dummy = new ListNode(); // 哨兵节点，作为合并后链表头节点的前一个节点
  let cur = dummy;
  while (!pq.isEmpty()) {
    // 循环直到堆为空
    const node = pq.dequeue(); // 剩余节点中的最小节点
    if (node.next) {
      // 下一个节点不为空
      pq.enqueue(node.next); // 下一个节点有可能是最小节点，入堆
    }
    cur.next = node; // 合并到新链表中
    cur = cur.next; // 准备合并下一个节点
  }
  return dummy.next; // 哨兵节点的下一个节点就是新链表的头节点
}; */
// 引入 MinPriorityQueue
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
export var mergeKLists = function (lists) {
  const pq = new MinPriorityQueue({ priority: (e) => e.val });
  for (const head of lists) {
    if (head) {
      pq.enqueue(head);
    }
  }

  const dummy = new ListNode(); // 哨兵节点，作为合并后链表头节点的前一个节点
  let cur = dummy;
  while (!pq.isEmpty()) {
    // 循环直到堆为空
    const node = pq.dequeue().element; // 剩余节点中的最小节点
    if (node.next) {
      // 下一个节点不为空
      pq.enqueue(node.next); // 下一个节点有可能是最小节点，入堆
    }
    cur.next = node; // 合并到新链表中
    cur = cur.next; // 准备合并下一个节点
  }
  return dummy.next; // 哨兵节点的下一个节点就是新链表的头节点
};

var mergeKLists = function (lists) {
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
// 堆的经典用法
// 下面是分治法
// 21. 合并两个有序链表
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(); // 用哨兵节点简化代码逻辑
  let cur = dummy; // cur 指向新链表的末尾
  while (list1 && list2) {
    if (list1.val < list2.val) {
      cur.next = list1; // 把 list1 加到新链表中
      list1 = list1.next;
    } else {
      // 注：相等的情况加哪个节点都是可以的
      cur.next = list2; // 把 list2 加到新链表中
      list2 = list2.next;
    }
    cur = cur.next;
  }
  cur.next = list1 ? list1 : list2; // 拼接剩余链表
  return dummy.next;
};

var mergeKLists = function (lists) {
  // 合并从 lists[i] 到 lists[j-1] 的链表
  function dfs(i, j) {
    const m = j - i;
    if (m === 0) {
      return null; // 注意输入的 lists 可能是空的
    }
    if (m === 1) {
      return lists[i]; // 无需合并，直接返回
    }
    const left = dfs(i, i + (m >> 1)); // 合并左半部分
    const right = dfs(i + (m >> 1), j); // 合并右半部分
    return mergeTwoLists(left, right); // 最后把左半和右半合并
  }
  return dfs(0, lists.length);
};

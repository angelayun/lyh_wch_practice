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
  cur.next = list1 ?? list2; // 拼接剩余链表
  return dummy.next;
};

var mergeTwoLists = function (list1, list2) {
  if (list1 === null) return list2; // 注：如果都为空则返回空
  if (list2 === null) return list1;
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  }
  list2.next = mergeTwoLists(list1, list2.next);
  return list2;
};

// 自己写的可以通过  但是灵神的判断逻辑更优化
var mergeTwoLists = function (list1, list2) {
  let dummyNode = new ListNode(-1);
  let p = dummyNode;
  while (list1 || list2) {
    if (list1 == null) {
      p.next = list2;
      break;
    } else if (list2 == null) {
      p.next = list1;
      break;
    } else if (list1.val < list2.val) {
      p.next = list1;
      p = p.next;
      list1 = list1.next;
    } else {
      p.next = list2;
      p = p.next;
      list2 = list2.next;
    }
  }
  return dummyNode.next;
};
var mergeTwoLists = function (list1, list2) {
  if (list1 == null) return list2;
  if (list2 == null) return list1;
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};

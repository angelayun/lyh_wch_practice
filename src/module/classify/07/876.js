
// 这个题目的本质在于  当链表长度是奇数的情况 fast指向末尾slow正好指向中间节点  当链表长度是偶数的情况下 fast指向空节点的时候，slow正好指向中间节点
var middleNode = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
// 876. 链表的中间结点
function middleNode(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

// 206. 反转链表
function reverseList(head) {
  let pre = null, cur = head;
  while (cur !== null) {
    const nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }
  return pre;
}

var isPalindrome = function (head) {
  const mid = middleNode(head);
  let head2 = reverseList(mid);
  while (head2 !== null) {
    if (head.val !== head2.val) { // 不是回文链表
      return false;
    }
    head = head.next;
    head2 = head2.next;
  }
  return true;
};
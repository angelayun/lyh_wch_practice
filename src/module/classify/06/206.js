var reverseList = function (head) {
  let pre = null, cur = head;
  while (cur) {
    const nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }
  return pre;
};
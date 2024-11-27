var mergeNodes = function (head) {
  let tail = head;
  // 因为题目说明开头和结尾都是0结点
  for (let cur = head.next; cur.next; cur = cur.next) {
    if (cur.val) {
      tail.val += cur.val;
    } else {
      tail = tail.next;
      tail.val = 0;
    }
  }
  tail.next = null;
  return head;
};

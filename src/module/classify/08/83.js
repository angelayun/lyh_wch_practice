var deleteDuplicates = function (head) {
  if (head === null) {
    return null;
  }
  let cur = head;
  while (cur.next) {
    if (cur.next.val === cur.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return head;
};
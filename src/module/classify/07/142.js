var detectCycle = function (head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (fast === slow) {
          while (slow !== head) {
              slow = slow.next;
              head = head.next;
          }
          return slow;
      }
  }
  return null;
};
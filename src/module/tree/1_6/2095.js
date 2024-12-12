/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function (head) {
  // let dummyNode = new ListNode(-1, head);
  let preSlow = null;
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    preSlow = slow;
    slow = slow.next;
  }
  if (preSlow && preSlow.next) {
    preSlow.next = preSlow.next.next;
  } else {
    return null;
  }
  // console.log(preSlow);
  return head;
};

// 上面判断特例的场景可以写成如下这样
var deleteMiddle = function (head) {
  if (head.next == null) return null;
  // let dummyNode = new ListNode(-1, head);
  let preSlow = null;
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    preSlow = slow;
    slow = slow.next;
  }
  preSlow.next = preSlow.next.next;
  return head;
};

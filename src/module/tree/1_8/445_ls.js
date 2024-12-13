var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  let newHead = reverseList(head.next);
  head.next.next = head; // 把下一个节点指向自己
  head.next = null; // 断开指向下一个节点的连接，保证最终链表的末尾节点的 next 是空节点
  return newHead;
};

// l1 和 l2 为当前遍历的节点，carry 为进位
var addTwo = function (l1, l2, carry = 0) {
  if (l1 === null && l2 === null) {
    // 递归边界：l1 和 l2 都是空节点
    return carry ? new ListNode(carry) : null; // 如果进位了，就额外创建一个节点
  }
  if (l1 === null) {
    // 如果 l1 是空的，那么此时 l2 一定不是空节点
    [l1, l2] = [l2, l1]; // 交换 l1 与 l2，保证 l1 非空，从而简化代码
  }
  carry += l1.val + (l2 ? l2.val : 0); // 节点值和进位加在一起
  l1.val = carry % 10; // 每个节点保存一个数位
  l1.next = addTwo(l1.next, l2 ? l2.next : null, Math.floor(carry / 10)); // 进位
  return l1;
};

var addTwoNumbers = function (l1, l2) {
  l1 = reverseList(l1);
  l2 = reverseList(l2); // l1 和 l2 反转后，就变成【2. 两数相加】了
  let l3 = addTwo(l1, l2);
  return reverseList(l3);
};

// 下面是解法2
// 视频讲解 https://www.bilibili.com/video/BV1sd4y1x7KN/
var reverseList = function (head) {
  let pre = null;
  let cur = head;
  while (cur) {
    let nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }
  return pre;
};

var addTwo = function (l1, l2) {
  let dummy = new ListNode(); // 哨兵节点
  let cur = dummy;
  let carry = 0; // 进位
  while (l1 || l2 || carry) {
    if (l1) carry += l1.val; // 节点值和进位加在一起
    if (l2) carry += l2.val; // 节点值和进位加在一起
    cur = cur.next = new ListNode(carry % 10); // 每个节点保存一个数位
    carry = Math.floor(carry / 10); // 新的进位
    if (l1) l1 = l1.next; // 下一个节点
    if (l2) l2 = l2.next; // 下一个节点
  }
  return dummy.next; // 哨兵节点的下一个节点就是头节点
};

var addTwoNumbers = function (l1, l2) {
  l1 = reverseList(l1);
  l2 = reverseList(l2);
  let l3 = addTwo(l1, l2);
  return reverseList(l3);
};

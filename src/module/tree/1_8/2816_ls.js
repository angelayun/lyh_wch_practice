// 206. 反转链表
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

// 2. 两数相加：自己和自己相加
// 题解 https://leetcode.cn/problems/add-two-numbers/solution/dong-hua-jian-ji-xie-fa-cong-di-gui-dao-oe0di/
var double = function (l1) {
  let dummy = new ListNode(); // 哨兵节点，作为新链表的头节点的前一个节点
  let cur = dummy;
  let carry = 0; // 进位
  while (l1) {
    carry += l1.val * 2; // 节点值和进位加在一起
    cur.next = new ListNode(carry % 10); // 每个节点保存一个数位
    carry = Math.floor(carry / 10); // 新的进位
    cur = cur.next; // 下一个节点
    l1 = l1.next; // 下一个节点
  }
  if (carry) {
    cur.next = new ListNode(carry);
  }
  return dummy.next; // 哨兵节点的下一个节点就是头节点
};

var doubleIt = function (head) {
  head = reverseList(head);
  const res = double(head); // 反转后，就变成【2. 两数相加】了
  return reverseList(res);
};

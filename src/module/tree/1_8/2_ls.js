// l1 和 l2 为当前遍历的节点，carry 为进位
var addTwoNumbers = function (l1, l2, carry = 0) {
  if (l1 === null && l2 === null) {
    // 递归边界：l1 和 l2 都是空节点
    return carry ? new ListNode(carry) : null; // 如果进位了，就额外创建一个节点
  }
  if (l1 === null) {
    // 如果 l1 是空的，那么此时 l2 一定不是空节点
    [l1, l2] = [l2, l1]; // 交换 l1 与 l2，保证 l1 非空，从而简化代码
  }
  const sum = carry + l1.val + (l2 ? l2.val : 0); // 节点值和进位加在一起
  l1.val = sum % 10; // 每个节点保存一个数位（直接修改原链表）
  l1.next = addTwoNumbers(l1.next, l2 ? l2.next : null, Math.floor(sum / 10)); // 进位
  return l1;
};

var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(); // 哨兵节点
  let cur = dummy;
  let carry = 0; // 进位
  while (l1 || l2 || carry) {
    if (l1) {
      carry += l1.val; // 节点值和进位加在一起
      l1 = l1.next; // 下一个节点
    }
    if (l2) {
      carry += l2.val; // 节点值和进位加在一起
      l2 = l2.next; // 下一个节点
    }
    cur = cur.next = new ListNode(carry % 10); // 每个节点保存一个数位
    carry = Math.floor(carry / 10); // 新的进位
  }
  return dummy.next; // 哨兵节点的下一个节点就是头节点
};

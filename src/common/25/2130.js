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

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
  let mid = middleNode(head)
  // 反转的是后半段
  let link = reverseList(mid)
  console.log(link)
  let ans = 0
  while (head && link) {
    ans = Math.max(head.val + link.val, ans)
    head = head.next;
    link = link.next
  }
  return ans
};
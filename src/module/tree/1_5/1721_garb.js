/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var swapNodes = function (head, k) {
  // 我是不是可以直接交互值
  // 先找到正数第k个
  let fast = head;
  let slow = head;
  let count = k;
  let fistNode = null;
  while (count--) {
    if (count == 0) {
      console.log(count, fast);
      firstNode = fast;
      console.log(firstNode);
    }
    fast = fast.next;
    // console.log(count)
  }
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  let lastNode = slow.next;
  console.log(firstNode, lastNode);
  if (firstNode && lastNode) {
    [firstNode.val, lastNode.val] = [lastNode.val, firstNode.val];
  }
  return head;
};

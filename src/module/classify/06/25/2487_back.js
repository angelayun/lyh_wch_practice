/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function (head) {
  let list = []
  let p = head
  while (p) {
    list.push(p.val)
    p = p.next;
  }
  const n = list.length
  // 存储后面是否有更大的节点
  let hasNext = new Array(n).fill(false)
  let stack = []
  for (let i = 0; i < n; i++) {
    while (stack.length && list[stack[stack.length - 1]] < list[i]) {
      let leftIndex = stack.pop();
      hasNext[leftIndex] = true
    }
    stack.push(i)
  }
  let newHead = new ListNode()
  p = newHead
  for (let i = 0; i < n; i++) {
    if (!hasNext[i]) {
      p.next = new ListNode(list[i])
      p = p.next;
    }
  }
  return newHead.next;
};
// 我自己写出来的，但是不是最优解
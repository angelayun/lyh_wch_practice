/**
 * // Definition for a Node.
 * function Node(val, next) {
 *     this.val = val;
 *     this.next = next;
 * };
 */

/**
 * @param {Node} head
 * @param {number} insertVal
 * @return {Node}
 */
var insert = function (head, insertVal) {
  if (head == null) {
    head = new Node(insertVal);
    head.next = head;
    return head;
  }
  let cur = head;
  while (cur.next != head) {
    if (
      (cur.val <= insertVal) ^
      (cur.next.val >= insertVal) ^
      (cur.next.val >= cur.val)
    )
      break;
    cur = cur.next;
  }
  cur.next = new Node(insertVal, cur.val);
  return head;
};

//   下面这种可能会更清晰一点
/**
 * @param {Node} head
 * @param {number} insertVal
 * @return {Node}
 */
var insert = function (head, insertVal) {
  if (head == null) {
    head = new Node(insertVal);
    head.next = head;
    return head;
  }
  let cur = head;
  while (cur.next != head) {
    // 看1 2 3 4的例子  如果要插入的是0 或者 5 
    if (cur.next.val < cur.val) {
      // 到了边界了  比最大的还要大
      if (cur.next.val >= insertVal) break;
      // 比最小的还小
      else if (cur.val <= insertVal) break;
    }
    // 找到了一个插入点
    if (cur.val <= insertVal && cur.next.val >= insertVal) break;
    cur = cur.next;
  }
  cur.next = new Node(insertVal, cur.next);
  return head;
};

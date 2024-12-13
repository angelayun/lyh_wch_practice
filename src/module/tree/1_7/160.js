var getIntersectionNode = function (headA, headB) {
  let p = headA,
    q = headB;
  while (p !== q) {
    p = p ? p.next : headB;
    q = q ? q.next : headA;
  }
  return p;
};
// ls的解法

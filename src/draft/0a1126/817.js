var numComponents = function (head, nums) {
  let set = new Set(nums);
  let cur = head;
  let cnt = 0;
  let isInSet = false;
  while (cur) {
    if (set.has(cur.val)) {
      if (!isInSet) {
        cnt++;
        isInSet = true;
      }
    } else isInSet = false;
    cur = cur.next;
  }
  return cnt;
};

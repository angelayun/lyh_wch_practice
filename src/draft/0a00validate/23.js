/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  // 左闭右开区间
  const dfs = (i, j) => {
    if (i + 1 > j) return null;
    if (i + 1 == j) return lists[i];
    let mid = i + ((j - i) >> 1);
    let left = dfs(i, mid);
    let right = dfs(mid, j);
    return mergeTwoLists(left, right);
  };
  return dfs(0, lists.length);
};

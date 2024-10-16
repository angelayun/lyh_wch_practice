var levelOrder = function(root) {
  if (root === null) return [];
  let ans = [];
  let cur = [root];
  while (cur.length) {
      let nxt = [];
      let vals = [];
      for (const node of cur) {
          vals.push(node.val);
          if (node.left)  nxt.push(node.left);
          if (node.right) nxt.push(node.right);
      }
      cur = nxt;
      ans.push(vals);
  }
  return ans;
};
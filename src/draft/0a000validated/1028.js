/**
 * @param {string} traversal
 * @return {TreeNode}
 */
var recoverFromPreorder = function (S) {
  // 字典初始化
  let ans = new Map();
  ans.set(-1, new TreeNode(0));
  let addTree = (v, p) => {
    // console.log('addTree',v,p)
    ans.set(p, new TreeNode(parseInt(v)));
    // 左子树不存在的话就加在左边
    let childNode = ans.get(p - 1);
    if (!childNode.left) {
      childNode.left = ans.get(p);
    } else {
      childNode.right = ans.get(p);
    }
  };
  let val = '',
    dep = 0;
  for (let c of S) {
    // 累加字符来获得数字
    if (c != '-') val += c;
    else if (val) {
      // 如果是‘-’且存在val  把累加好的数字和对应深度添加进树 值和对应深度重新初始化
      addTree(val, dep);
      val = '';
      dep = 1;
    } else {
      // 连续的‘-’只加深度不加值
      dep++;
    }
  }
  // 末尾剩余的数字也要加进树
  addTree(val, dep);
  // console.log(ans);
  // return null;
  return ans.get(0);
};
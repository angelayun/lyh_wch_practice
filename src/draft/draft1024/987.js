/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  let map = new Map()
  const dfs = (root, row, col) => {
    if (root == null) return
    let rowMap = new Map()
    if (map.has(col)) {
      rowsMap = map.get(col)
    } else {
      map.set(col, rowMap)
    }
    let list = []
    if (rowMap.has(row)) {
      list = rowMap.get(row)
    } else {
      rowMap.set(row, list)
    }
    // 记录的是行号  及 对应的值
    list.push(root.val)
    dfs(root.left, row + 1, col - 1)
    dfs(root.right, row + 1, col + 1)
  }
  dfs(root, 0, 0)
  console.log(map)
  let ans = []
  let keys = Array.from(map.keys()).sort((a, b) => a - b)
  for (let key of keys) {
    // 按行号进行排序
    let value = map.get(key)
    console.log(key, value)
    // console.log(key, row, list)
    // value[1].sort((a, b) => a - b)
    // ans.push(...value[1])
  }
  return ans

};
/**
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
  // 两次遍历的方式
  /* let set = new Set()
  for (let [s, t] of paths) {
    set.add(s)
  }
  for (let [s, t] of paths) {
    if (!set.has(t)) return t
  }
  return '' */
  let setA = new Set()
  // 这个是答案的列表
  let setB = new Set()
  for (let [source, target] of paths) {
    setB.delete(source)
    if (!setA.has(target)) {
      setB.add(target)
    }
    setA.add(source)
  }
  return Array.from(setB)[0]
};
/**
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
  // setb放的是可能的结果
  const setA = new Set(), setB = new Set()
  for (let [source, target] of paths) {
    // 在起点里面的肯定不是结果
    setB.delete(source)
    // 如果终点是不在起点的值   那有可能会是结果
    if (!setA.has(target)) {
      setB.add(target)
    }
    setA.add(source)
  }
  // 直接Array.from(setB) 而不是Array.from(...setB)
  return Array.from(setB)[0]
};
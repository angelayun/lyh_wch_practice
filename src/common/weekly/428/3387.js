/**
 * @param {string} initialCurrency
 * @param {string[][]} pairs1
 * @param {number[]} rates1
 * @param {string[][]} pairs2
 * @param {number[]} rates2
 * @return {number}
 */
var maxAmount = function (initialCurrency, pairs1, rates1, pairs2, rates2) {
  let graph = {};
  for (let i = 0; i < pairs1.length; i++) {
    let x = pairs1[i],
      y = rates1[i];
    if (graph[x] == null) {
      graph[x]=[]
    }
    if (graph[y] == null) {
      graph[y]=[]
    }
    graph[x].push([y,r])
  }
};

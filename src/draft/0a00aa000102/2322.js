/**
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number}
 */
var minimumScore = function (nums, edges) {
  const n = nums.length;
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  let xor = Array.from({ length: n }, () => 0);
  let in_ = Array.from({ length: n }, () => 0);
  let out = Array.from({ length: n }, () => 0);
  let clock = 0;
  const dfs = (x, father) => {
    clock++;
    in_[x] = clock;
    xor[x] = nums[x];
    for (const y of graph[x]) {
      if (y !== father) {
        dfs(y, x);
        xor[x] ^= xor[y];
      }
    }
    out[x] = clock;
  };
  dfs(0, -1);

  let ans = Infinity;
  // 枚举不是根的两个点，删除这两个点及其父节点形成的边
  for (let i = 2; i < n; i++) {
    for (let j = 1; j < i; j++) {
      let x, y, z;
      if (in_[i] < in_[j] && in_[j] <= out[i]) {
        // i是j的祖先节点
        x = xor[j];
        y = xor[i] ^ xor[j];
        z = xor[0] ^ xor[i];
      } else if (in_[j] < in_[i] && in_[i] <= out[j]) {
        // j是i的祖先节点
        x = xor[i];
        y = xor[i] ^ xor[j];
        z = xor[0] ^ xor[j];
      } else {
        // 删除两条边分别属于两颗不相交的子树
        x = xor[i];
        y = xor[j];
        z = xor[0] ^ xor[i] ^ xor[j];
      }
      ans = Math.min(ans, Math.max(x, y, z) - Math.min(x, y, z));
      if (ans == 0) return 0;
    }
  }
  return ans;
};

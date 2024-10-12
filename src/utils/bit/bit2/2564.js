const cnt = new Map()
  
const NOT_FOUND = [-1, -1]
let index = s.indexOf('0')
cnt.set(0, [index, index])
for (let left = 0, n = s.length; left < n; left++) {
  if (s[left] == 0) continue
  for (let right = left, x = 0; right < Math.min(left + 30, n); right++) {
    x = x << 1 | (s[right] & 1)
    if (!cnt.has(x)) {
      cnt.set(x, [left, right])
    }
  }
}
let ans = new Array(queries.length).fill(0)
for (let i = 0; i < queries.length; i++) {
  ans[i] = cnt.get(queries[i][0] ^ queries[i][1]) || NOT_FOUND
}
return ans
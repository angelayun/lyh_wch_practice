package a0813

import (
	"cmp"
	"fmt"
	"slices"
	"strconv"
	"unicode"
)

const mx = 1e5 + 1

var np = [mx]bool{0: true, 1: true}

// 也可以写成下面这样
// var np = [mx]bool{true, true} // 0 和 1 不是质数
func init() {
	// 质数=false，非质数=true
	for i := 2; i*i < mx; i++ {
		if !np[i] {
			for j := i * i; j < mx; j += i {
				np[j] = true
			}
		}
	}
}
func isPrime(x int) bool {
	for i := 2; i*i <= x; i++ {
		if x%i == 0 {
			return false
		}
	}
	return x > 1
}
func sumOfLargestPrimes(s string) int64 {
	arr := []int{}
	cnt := map[int]bool{}
	n := len(s)
	for i := 0; i < n; i++ {
		for j := i; j < n; j++ {
			v, _ := strconv.Atoi(s[i : j+1])
			if (v < mx && !np[v]) || (v > mx && isPrime(v)) {
				if !cnt[v] {
					arr = append(arr, v)
					cnt[v] = true
				}
			}
		}
	}
	slices.SortFunc(arr, func(x, y int) int { return y - x })
	fmt.Println(arr)
	sum := 0
	for _, v := range arr[:min(len(arr), 3)] {
		sum += v
	}
	return int64(sum)
}

func maxSubstrings222(word string) (ans int) {
	n := len(word)
	if n < 2 {
		return
	}
	type pair struct{ first, last int }
	pos := [26]pair{}
	for i := range pos {
		pos[i] = pair{first: -1}
	}
	for i, ch := range word {
		index := ch - 'a'
		item := pos[index]
		if item.first == -1 {
			pos[index] = pair{i, i}
		} else if item.first == item.last {
			item.last = i
			pos[index] = item
		}
	}
	fn := func(index int) (ans int) {
		for i := index; i < n; i++ {
			end := pos[word[i]-'a'].last
			if end-i+1 >= 4 {
				ans++
				i = end
			}
		}
		return ans
	}
	for i := 0; i < pos[word[i]-'a'].last; i++ {
		ans = max(ans, fn(i))
	}
	return
}

func maxSubstrings(word string) (ans int) {
	pos := [26]int{}
	for i, b := range word {
		b -= 'a'
		if pos[b] == 0 {
			pos[b] = i + 1
		} else if i+1-pos[b]+1 >= 4 {
			ans++
			clear(pos[:])
		}
	}
	return
}

func assignEdgeWeights(edges [][]int) int {
	n := len(edges) + 1
	g := make([][]int, n+1)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}

	var dfs func(int, int) int
	dfs = func(x, fa int) (d int) {
		for _, y := range g[x] {
			if y != fa { // 不递归到父节点
				d = max(d, dfs(y, x)+1)
			}
		}
		return
	}

	k := dfs(1, 0)
	return pow(2, k-1)
}

func pow(x, n int) int {
	const mod = 1_000_000_007
	res := 1
	for ; n > 0; n /= 2 {
		if n%2 > 0 {
			res = res * x % mod
		}
		x = x * x % mod
	}
	return res
}

func areSimilar(mat [][]int, k int) bool {
	n := len(mat[0])
	k %= n
	if k == 0 {
		return true
	}
	for _, r := range mat {
		if !slices.Equal(r, append(r[k:], r[:k]...)) {
			return false
		}
	}
	return true
}

func oddString(words []string) string {
	cnt := map[string][]string{}
	d := make([]byte, len(words)-1)
	for _, s := range words {
		for i := 0; i < len(s)-1; i++ {
			d[i] = s[i+1] - s[i]
		}
		cnt[string(d)] = append(cnt[string(d)], s)
	}
	for _, ls := range cnt {
		if len(ls) == 1 {
			return ls[0]
		}
	}
	return ""
}
func findRotation(mat [][]int, target [][]int) bool {
	// 检查原始矩阵是否已经匹配
	if equals(mat, target) {
		return true
	}

	// 最多旋转3次（加上原始状态共4种可能）
	for i := 0; i < 3; i++ {
		mat = rotate(mat)
		if equals(mat, target) {
			return true
		}
	}

	return false
}

// 检查两个矩阵是否相等
func equals(a, b [][]int) bool {
	n := len(a)
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if a[i][j] != b[i][j] {
				return false
			}
		}
	}
	return true
}

// 将矩阵顺时针旋转90度
func rotate(mat [][]int) [][]int {
	n := len(mat)
	// 创建新矩阵存储旋转结果
	rotated := make([][]int, n)
	for i := range rotated {
		rotated[i] = make([]int, n)
	}

	// 旋转逻辑：原位置(i,j)会旋转到(j, n-1-i)
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			rotated[j][n-1-i] = mat[i][j]
		}
	}

	return rotated
}

/* func findRotation(mat [][]int, target [][]int) bool {
	fn := func(mat [][]int, target [][]int) bool {
		m, n := len(mat), len(mat[0])
		ans:=make([][]int,n)
		for i:=range ans{
			ans[i]=make([]int, m)
		}
		for i:=range mat{
			for j:=range mat[i]{
				ans[j][i]=mat[i][j]
			}
		}
		return ans==target
	}
	for i:=range 4{
		if fn(mat,target){
			return true
		}
	}

} */

/* 1 2 3 4 5
6 7 8 9 10

1 6
2 7
3 8
4 9
5 10 */

func minCostToMoveChips(position []int) int {
	sum := [2]int{}
	for i, x := range position {
		sum[i&1] += x
	}
	if sum[0] > sum[1] {
		return sum[0] - sum[1]
	} else {
		return sum[1] - sum[0]
	}
}

func checkPowersOfThree(n int) bool {
	for n >= 0 {
		if n%3 == 0 || n%3 == 1 {
			n /= 3
		} else {
			return false
		}
	}
	return true
}

func smallestIndex(nums []int) int {
	for i, x := range nums {
		sum := 0
		for ; x > 0; x /= 10 {
			sum += x % 10
		}
		if sum == i {
			return i
		}
	}
	return -1
}

// 链接 https://leetcode.cn/discuss/post/mOr1u6/
type unionFind struct {
	fa []int // 代表元
	sz []int // 集合大小
	cc int   // 连通块个数
}

func newUnionFind(n int) unionFind {
	fa := make([]int, n)
	sz := make([]int, n)
	// 一开始有 n 个集合 {0}, {1}, ..., {n-1}
	// 集合 i 的代表元是自己，大小为 1
	for i := range fa {
		fa[i] = i
		sz[i] = 1
	}
	return unionFind{fa, sz, n}
}

// 返回 x 所在集合的代表元
// 同时做路径压缩，也就是把 x 所在集合中的所有元素的 fa 都改成代表元
func (u unionFind) find(x int) int {
	// 如果 fa[x] == x，则表示 x 是代表元
	if u.fa[x] != x {
		u.fa[x] = u.find(u.fa[x]) // fa 改成代表元
	}
	return u.fa[x]
}

// 判断 x 和 y 是否在同一个集合
func (u unionFind) same(x, y int) bool {
	// 如果 x 的代表元和 y 的代表元相同，那么 x 和 y 就在同一个集合
	// 这就是代表元的作用：用来快速判断两个元素是否在同一个集合
	return u.find(x) == u.find(y)
}

// 把 from 所在集合合并到 to 所在集合中
// 返回是否合并成功
func (u *unionFind) merge(from, to int) bool {
	x, y := u.find(from), u.find(to)
	if x == y { // from 和 to 在同一个集合，不做合并
		return false
	}
	u.fa[x] = y        // 合并集合。修改后就可以认为 from 和 to 在同一个集合了
	u.sz[y] += u.sz[x] // 更新集合大小（注意集合大小保存在代表元上）
	// 无需更新 sz[x]，因为我们不用 sz[x] 而是用 sz[find(x)] 获取集合大小，但 find(x) == y，我们不会再访问 sz[x]
	u.cc-- // 成功合并，连通块个数减一
	return true
}

// 返回 x 所在集合的大小
func (u unionFind) size(x int) int {
	return u.sz[u.find(x)] // 集合大小保存在代表元上
}
func minSwaps(nums []int) int {
	n := len(nums)
	type pair struct{ s, v, i int }
	a := []pair{}
	for i, x := range nums {
		s := 0
		for v := x; v > 0; v /= 10 {
			s += v % 10
		}
		a = append(a, pair{s, x, i})
	}
	slices.SortFunc(a, func(x, y pair) int {
		return cmp.Or(cmp.Compare(x.s, y.s), cmp.Compare(x.v, y.v))
	})
	uf := newUnionFind(n)
	for i, item := range a {
		uf.merge(i, item.i)
	}
	return n - uf.cc
}

func minMoves(matrix []string) int {
	m, n := len(matrix), len(matrix[0])
	if matrix[m-1][n-1] == '#' {
		return -1
	}
	type pair struct{ x, y int }
	pos := ['Z' + 1][]pair{}
	for i, rows := range matrix {
		for j, col := range rows {
			if unicode.IsUpper(col) {
				pos[col] = append(pos[col], pair{i, j})
			}
		}
	}
	var dir4 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	dis := make([][]int, m)
	for i := range dis {
		dis[i] = make([]int, n)
		for j := range dis[i] {
			dis[i][j] = -1
		}
	}
	// 从左上角出发
	dis[0][0] = 0
	q0 := []pair{}
	q1 := []pair{}
	for len(q0) > 0 || len(q1) > 0 {
		var q pair
		if len(q0) > 0 {
			q, q0 = q0[len(q0)-1], q0[:len(q0)-1]
		} else if len(q1) > 0 {
			q, q1 = q1[0], q1[1:]
		}
		d := dis[q.x][q.y]
		if q.x == m-1 && q.y == n-1 {
			return d
		}
		if c := matrix[q.x][q.y]; c != '.' {
			for _, p := range pos[c] {
				x, y := p.x, p.y
				if d < dis[x][y] {
					dis[x][y] = d
					q0 = append(q0, pair{x, y})
				}
			}
			pos[c] = nil
		}
		for _, dir := range dir4 {
			x, y := q.x+dir.x, q.y+dir.y
			if x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] != '#' && d+1 < dis[x][y] {
				dis[x][y] = d + 1
				q1 = append(q1, pair{x, y})
			}
		}
	}
	return -1
}

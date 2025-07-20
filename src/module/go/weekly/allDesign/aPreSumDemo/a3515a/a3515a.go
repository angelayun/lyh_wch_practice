package a3515a

func treeQueries(n int, edges [][]int, queries [][]int) (ans []int) {
	g := make([][]int, n+1)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	in := make([]int, n+1)
	out := make([]int, n+1)
	clock := 0
	var dfs func(int, int)
	dfs = func(x, fa int) {
		clock++
		in[x] = clock
		for _, y := range g[x] {
			if y != fa {
				dfs(y, x)
			}
		}
		out[x] = clock
	}
	dfs(1, 0)
	// 对于一条边 x-y（y 是 x 的儿子），把边权保存在 weight[y] 中
	weights := make([]int, n+1)
	diff := newFenwickTree(n)
	update := func(x, y, w int) {
		// 保证 y是儿子
		if in[x] > in[y] {
			x, y = y, x
		}
		d := w - weights[y]
		weights[y] = w
		diff.update(in[y], d)
		diff.update(out[y]+1, -d)
	}
	for _, e := range edges {
		update(e[0], e[1], e[2])
	}
	for _, q := range queries {
		if q[0] == 1 {
			update(q[1], q[2], q[3])
		} else {
			ans = append(ans, diff.pre(in[q[1]]))
		}
	}
	return
}

// https://leetcode.cn/discuss/post/3583665/
// fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/
type fenwick []int

func newFenwickTree(n int) fenwick {
	return make(fenwick, n+1) // 使用下标 1 到 n
}

// a[i] 增加 val
// 1 <= i <= n
// 时间复杂度 O(log n)
func (f fenwick) update(i int, val int) {
	for ; i < len(f); i += i & -i {
		f[i] += val
	}
}

// 求前缀和 a[1] + ... + a[i]
// 1 <= i <= n
// 时间复杂度 O(log n)
func (f fenwick) pre(i int) (res int) {
	for ; i > 0; i &= i - 1 {
		res += f[i]
	}
	return
}

// 求区间和 a[l] + ... + a[r]
// 1 <= l <= r <= n
// 时间复杂度 O(log n)
func (f fenwick) query(l, r int) int {
	if r < l {
		return 0
	}
	return f.pre(r) - f.pre(l-1)
}

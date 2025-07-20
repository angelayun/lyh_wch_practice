package lcp05

func bonus(n int, edges [][]int, operations [][]int) (ans []int) {
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
	weights := make([]int, n+1)
	diff := newFenwickTree(n)

	for _, q := range operations {
		if q[0] == 1 {
			x, w := q[1], q[2]
			d := w - weights[x]
			weights[x] = w
			diff.update(in[x], d)
			diff.update(in[x]+1, -d)
		} else if q[0] == 2 {
			x, w := q[1], q[2]
			d := w - weights[x]
			weights[x] = w
			diff.update(in[x], d)
			diff.update(out[x]+1, -d)
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

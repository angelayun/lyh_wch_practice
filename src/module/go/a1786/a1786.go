package a1786

import (
	"container/heap"
	"math"
)

func countRestrictedPaths(n int, edges [][]int) int {
	g := make([][]tuple, n)
	for _, t := range edges {
		x, y, w := t[0]-1, t[1]-1, t[2]
		g[x] = append(g[x], tuple{y, w})
		g[y] = append(g[y], tuple{x, w})
	}
	dist := make([]int, n)
	for i := range dist {
		dist[i] = math.MaxInt
	}
	dist[n-1] = 0
	h := hp{{n - 1, 0}}
	for len(h) > 0 {
		p := heap.Pop(&h).(tuple)
		dx := p.dis
		x := p.x
		if dx > dist[x] {
			continue
		}
		for _, e := range g[x] {
			y := e.x
			newDis := dist[x] + e.dis
			if newDis < dist[y] {
				dist[y] = newDis
				heap.Push(&h, tuple{y, newDis})
			}
		}
	}
	memo := make([]int, n)
	for i := range memo {
		memo[i] = -1
	}
	const mod int = 1e9 + 7
	var dfs func(int) int
	dfs = func(u int) int {
		if u >= n-1 {
			return 1
		}
		p := &memo[u]
		if *p != -1 {
			return *p
		}
		res := 0
		for _, e := range g[u] {
			v := e.x
			if dist[u] > dist[v] {
				res = (res + dfs(v)) % mod
			}
		}
		*p = res
		return res
	}
	return dfs(0)
}

type tuple struct {
	x, dis int
}

// hp 定义一个堆类型，存储 tuple 元素
type hp []tuple

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法，按照概率从小到大排序
func (h hp) Less(i, j int) bool { return h[i].dis < h[j].dis }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(tuple)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }

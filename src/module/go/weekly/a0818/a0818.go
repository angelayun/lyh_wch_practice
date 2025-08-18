package a0818

import (
	"container/heap"
	"math"
)

func minSensors(n int, m int, k int) int {
	fn := func(a, b int) int {
		return (a + b - 1) / b
	}
	return fn(n, 2*k+1) * fn(m, 2*k+1)
}

func perfectPairs(nums []int) int64 {
	return 0
}
func minCost(n int, edges [][]int) int {
	type edge struct{ to, wt int }
	g := make([][]edge, n)
	for _, e := range edges {
		x, y, wt := e[0], e[1], e[2]
		g[x] = append(g[x], edge{y, wt})
		g[y] = append(g[y], edge{x, wt * 2})
	}
	dis := make([]int, n)
	for i := range dis {
		dis[i] = math.MaxInt
	}
	dis[0] = 0
	h := hp{{}}
	for h.Len() > 0 {
		p := heap.Pop(&h).(pair)
		disX, x := p.dis, p.x
		if disX > dis[x] {
			continue
		}
		if x == n-1 {
			return disX
		}
		for _, e := range g[x] {
			y := e.to
			newDisY := disX + e.wt
			if newDisY < dis[y] {
				dis[y] = newDisY
				heap.Push(&h, pair{newDisY, y})
			}
		}
	}
	return -1
}

type pair struct {
	dis, x int
}

// hp 定义一个堆类型, 存储 tuple 元素
type hp []pair

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法, 按照概率从小到大排序
func (h hp) Less(i, j int) bool { return h[i].dis > h[j].dis }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(pair)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }

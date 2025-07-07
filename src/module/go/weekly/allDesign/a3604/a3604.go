package a3604

import (
	"container/heap"
	"math"
)

func minTime(n int, edges [][]int) int {
	type edge struct{ y, start, end int }
	g := make([][]edge, n)
	for _, e := range edges {
		x, y, s, ex := e[0], e[1], e[2], e[3]
		g[x] = append(g[x], edge{y, s, ex})
	}
	dis := make([]int, n)
	for i := range dis {
		dis[i] = math.MaxInt
	}
	dis[0] = 0
	h := hp{{}}
	for len(h) > 0 {
		p := heap.Pop(&h).(pair)
		x, d := p.x, p.d
		if d > dis[x] {
			continue
		}
		if x == n-1 {
			return d
		}
		for _, e := range g[x] {
			y := e.y
			newD := max(e.start, d) + 1
			if newD-1 <= e.end && newD < dis[y] {
				dis[y] = newD
				heap.Push(&h, pair{newD, y})
			}
		}
	}
	return -1
}

type pair struct {
	d, x int
}

// hp 定义一个堆类型, 存储 tuple 元素
type hp []pair

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法, 按照概率从大到小排序
func (h hp) Less(i, j int) bool { return h[i].d < h[j].d }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(pair)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }

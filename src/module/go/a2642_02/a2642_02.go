package a264202

import (
	"container/heap"
	"math"
)

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
type Graph [][]tuple

func Constructor(n int, edges [][]int) Graph {
	g := make(Graph, n)
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[x] = append(g[x], tuple{y, w})
	}
	return g
}

func (g Graph) AddEdge(edge []int) {
	x, y, w := edge[0], edge[1], edge[2]
	g[x] = append(g[x], tuple{y, w})
}

func (g Graph) ShortestPath(start int, end int) int {
	n := len(g)
	dis := make([]int, n)
	for i := range dis {
		dis[i] = math.MaxInt
	}
	dis[start] = 0
	h := hp{{start, 0}}
	for len(h) > 0 {
		p := heap.Pop(&h).(tuple)
		x, d := p.x, p.dis
		if x == end {
			return d
		}
		if d > dis[x] {
			continue
		}
		for _, e := range g[x] {
			y, w := e.x, e.dis
			newD := d + w
			if newD < dis[y] {
				heap.Push(&h, tuple{y, newD})
			}
		}
	}
	return -1
}

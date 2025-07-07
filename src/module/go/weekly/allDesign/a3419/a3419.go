package a3419

import (
	"container/heap"
	"math"
	"slices"
)

func minMaxWeight(n int, edges [][]int, threshold int) int {
	if len(edges) < n-1 {
		return -1
	}
	type edge struct{ to, w int }
	g := make([][]edge, n)
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		// 建立反图
		g[y] = append(g[y], edge{x, w})
	}
	dist := make([]int, n)
	for i := range dist {
		dist[i] = math.MaxInt
	}
	dist[0] = 0
	h := hp{{}}
	for len(h) > 0 {
		p := heap.Pop(&h).(pair)
		x, d := p.x, p.dis
		if d > dist[x] {
			continue
		}
		for _, item := range g[x] {
			y := item.to
			newD := max(d, item.w)
			if newD < dist[y] {
				dist[y] = newD
				heap.Push(&h, pair{y, newD})
			}
		}
	}
	ans := slices.Max(dist)
	if ans == math.MaxInt {
		return -1
	}
	return ans
}

type pair struct {
	x   int
	dis int
}

// hp 定义一个堆类型, 存储 tuple 元素
type hp []pair

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法, 按照概率从小到大排序
func (h hp) Less(i, j int) bool { return h[i].dis < h[j].dis }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(pair)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }

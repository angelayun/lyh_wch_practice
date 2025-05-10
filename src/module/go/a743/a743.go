package a743

import (
	"container/heap"
	"math"
	"slices"
)

func networkDelayTime(times [][]int, n int, k int) int {
	g := make([][]tuple, n)
	for _, t := range times {
		x, y, wt := t[0]-1, t[1]-1, t[2]
		g[x] = append(g[x], tuple{y, wt})
	}
	dis := make([]int, n)
	for i := range dis {
		dis[i] = math.MaxInt
	}
	h := hp{{k - 1, 0}}
	for len(h) > 0 {
		top := heap.Pop(&h).(tuple)
		if top.wt > dis[top.x] {
			continue
		}
		for _, e := range g[top.x] {
			y, wt := e.x, e.wt
			newD := top.wt + wt
			if newD < dis[y] {
				dis[y] = newD
				heap.Push(&h, tuple{y, newD})
			}
		}
	}
	mx := slices.Max(dis)
	if mx < math.MaxInt {
		return mx
	}
	return -1
}

type tuple struct {
	x, wt int
}

// hp 定义一个堆类型，存储 tuple 元素
type hp []tuple

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法，按照概率从小到大排序
func (h hp) Less(i, j int) bool { return h[i].wt < h[j].wt }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(tuple)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }

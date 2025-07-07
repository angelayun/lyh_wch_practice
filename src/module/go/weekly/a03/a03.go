package a03

import (
	"container/heap"
	"math"
)

func minTime(n int, edges [][]int) int {
	dis := make([]int, n)
	for i := range dis {
		dis[i] = math.MaxInt
	}
	dis[0] = 0
	g := make([][]tuple, n)
	mn := make([]int, n)
	for i := range mn {
		mn[i] = math.MaxInt
	}
	mx := make([]int, n)
	for i := range mx {
		mx[i] = math.MinInt
	}
	for _, e := range edges {
		x, y, start, end := e[0], e[1], e[2], e[3]
		g[x] = append(g[x], tuple{y, 0})
		mn[y] = start
		mx[y] = end
	}
	h := hp{{0, 0}}
	for {
		top := heap.Pop(&h).(tuple)
		i := top.to
		if i == n-1 {
			return top.t
		}
		if top.t > dis[i] {
			continue
		}
		for _, item := range g[i] {
			y, t := item.to, item.t

			curTime := t
			if t < mn[y] {
				t = mn[y]
				curTime = t
			}
			if t > mx[y] {
				continue
			}
			newT := curTime + 1
			if newT < dis[y] {
				dis[y] = newT
				heap.Push(&h, tuple{y, newT})

			}
		}

	}
	return -1
}

type tuple struct {
	to, t int
}

// hp 定义一个堆类型，存储 tuple 元素
type hp []tuple

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法，按照概率从小到大排序
func (h hp) Less(i, j int) bool { return h[i].t < h[j].t }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(tuple)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }

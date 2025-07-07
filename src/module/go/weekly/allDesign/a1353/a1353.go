package a1353

import (
	"container/heap"
	"sort"
)

func maxEvents(events [][]int) (ans int) {
	mx := 0
	for _, e := range events {
		mx = max(mx, e[1])
	}
	groups := make([][]int, mx+1)
	for _, e := range events {
		start, end := e[0], e[1]
		groups[start] = append(groups[start], end)
	}
	h := hp{}
	for i, g := range groups {
		for h.Len() > 0 && h.IntSlice[0] < i {
			heap.Pop(&h)
		}
		for _, endDay := range g {
			heap.Push(&h, endDay)
		}
		if h.Len() > 0 {
			ans++
			heap.Pop(&h)
		}
	}
	return
}

// 堆模板 Int 数组（从小到大排序）
type hp struct{ sort.IntSlice }

func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
	a := h.IntSlice
	v := a[len(a)-1]
	h.IntSlice = a[:len(a)-1]
	return v
}

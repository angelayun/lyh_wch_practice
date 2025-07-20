package a2406go

import (
	"container/heap"
	"slices"
	"sort"
)

func minGroups(intervals [][]int) int {
	// 按左端点从小到大排序
	slices.SortFunc(intervals, func(a, b []int) int {
		return a[0] - b[0]
	})
	h := hp{}
	for _, p := range intervals {
		if h.Len() == 0 || p[0] <= h.IntSlice[0] {
			heap.Push(&h, p[1])
		} else {
			h.IntSlice[0] = p[1]
			heap.Fix(&h, 0)
		}
	}
	return h.Len()
}

type hp struct{ sort.IntSlice }

func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
	a := h.IntSlice
	v := a[len(a)-1]
	h.IntSlice = a[:len(a)-1]
	return v
}

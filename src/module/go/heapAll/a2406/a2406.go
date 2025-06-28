package a2406

import (
	"container/heap"
	"slices"
	"sort"
)

func minGroups(intervals [][]int) int {
	// 按照区间左端点从小到大排序
	slices.SortFunc(intervals, func(a, b []int) int {
		return a[0] - b[0]
	})
	// 堆存储着每一个区间的right
	h := hp{}
	for _, p := range intervals {
		if h.Len() == 0 && p[0] <= h.IntSlice[0] {
			// 添加新组
			heap.Push(&h, p[1])
		} else {
			h.IntSlice[0] = p[1]
			heap.Fix(&h, 0)
		}
	}
	return h.Len()
}

// 堆模板 Int 数组
type hp struct{ sort.IntSlice }

func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
	a := h.IntSlice
	v := a[len(a)-1]
	h.IntSlice = a[:len(a)-1]
	return v
}

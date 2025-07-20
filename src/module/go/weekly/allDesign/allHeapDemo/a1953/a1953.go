package a1953

import (
	"container/heap"
	"sort"
)

func numberOfWeeks(milestones []int) int64 {
	h := hp{milestones}
	heap.Init(&h)
	ans := 0
	for h.Len() > 1 {
		first := heap.Pop(&h).(int)
		second := heap.Pop(&h).(int)
		first--
		second--
		ans += 2
		if first > 0 {
			heap.Push(&h, first)
		}
		if second > 0 {
			heap.Push(&h, second)
		}
	}
	if h.Len() > 0 {
		ans++
	}
	return int64(ans)
}

type hp struct{ sort.IntSlice }

// 从大到小
func (h hp) Less(i, j int) bool  { return h.IntSlice[i] > h.IntSlice[j] }
func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
	a := h.IntSlice
	v := a[len(a)-1]
	h.IntSlice = a[:len(a)-1]
	return v
}

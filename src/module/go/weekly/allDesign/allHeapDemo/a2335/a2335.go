package a2335

import (
	"container/heap"
	"sort"
)

func fillCups(amount []int) (ans int) {
	h := hp{amount}
	heap.Init(&h)
	for h.Len() >= 2 {
		if h.IntSlice[0] > 1 {
			h.IntSlice[0]--
			heap.Fix(&h, 0)
			if h.IntSlice[1] > 1 {
				h.IntSlice[1]--
				heap.Fix(&h, 1)
			} else{
				
			}
		} else {
			heap.Pop(&h)
		}
		ans++
	}
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

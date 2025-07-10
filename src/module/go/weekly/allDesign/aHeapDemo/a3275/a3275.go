package a3275

import (
	"container/heap"
	"sort"
)

func resultsArray(queries [][]int, k int) []int {
	m := len(queries)
	ans := make([]int, m)
	h := hp{}
	for i, q := range queries {
		x, y := q[0], q[1]
		val := abs(x) + abs(y)
		heap.Push(&h, val)
		if h.Len() > k {
			heap.Pop(&h)
		}
		if h.Len() < k {
			ans[i] = -1
		} else {
			ans[i] = h.IntSlice[0]
		}
	}
	return ans
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
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

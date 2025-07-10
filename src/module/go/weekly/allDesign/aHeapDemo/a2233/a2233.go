package a2233

import (
	"container/heap"
	"sort"
)

func maximumProduct(nums []int, k int) (ans int) {
	h := hp{nums}
	heap.Init(&h)
	for ; k > 0; k-- {
		h.IntSlice[0] += 1
		heap.Fix(&h, 0)
	}
	const mod = 1_000_000_007
	ans = 1
	for _, x := range h.IntSlice {
		ans = (ans * x) % mod
	}
	return
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

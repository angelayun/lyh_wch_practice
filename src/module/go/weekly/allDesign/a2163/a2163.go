package a2163

import "sort"
func minimumDifference(nums []int) int64 {
    
}

type hp struct{ sort.IntSlice }

func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
  a := h.IntSlice
  v := a[len(a)-1]
  h.IntSlice = a[:len(a)-1]
  return v
}

type minHeap struct{ sort.IntSlice }
func (minHeap) Push(any) {}
func (minHeap) Pop() (_ any) { return }

type maxHeap struct{ sort.IntSlice }
func (h maxHeap) Less(i, j int) bool { return h.IntSlice[i] > h.IntSlice[j] }
func (maxHeap) Push(any) {}
func (maxHeap) Pop() (_ any) { return }
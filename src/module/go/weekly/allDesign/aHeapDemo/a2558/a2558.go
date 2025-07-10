package a2558

import (
	"container/heap"
	"math"
	"sort"
)

func pickGifts(gifts []int, k int) int64 {
	// 用这种切片的写法就只能这样写了
	h := hp{}
	for _, gift := range gifts {
		heap.Push(&h, gift)
	}
	for i:=0;i<k;i++{
		mx:=heap.Pop(&h).(int)
		newGift:=int(math.Sqrt(float64(mx)))
		heap.Push(&h,newGift)
	}
	sum:=0
	for _,x:=range h.IntSlice{
		sum+=x
	}
	return int64(sum)
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

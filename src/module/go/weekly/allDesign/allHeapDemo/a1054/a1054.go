package a1054

import (
	"container/heap"
	"sort"
)

func rearrangeBarcodes(barcodes []int) (ans []int) {
	cnt := map[int]int{}
	for _, x := range barcodes {
		cnt[x]++
	}
	h := hp{}
	for v, c := range cnt {
		heap.Push(&h, tuple{c, v})
	}
	for h.Len() > 1 {
		first := heap.Pop(&h).(tuple)
		second := heap.Pop(&h).(tuple)
		ans = append(ans, first.val)
		ans = append(ans, second.val)
		first.cnt--
		second.cnt--
		if first.cnt > 0 {
			heap.Push(&h, first)
		}
		if second.cnt > 0 {
			heap.Push(&h, second)
		}
	}
	for h.Len() > 0 {
		ans = append(ans, heap.Pop(&h).(tuple).val)
	}
	return
}

type tuple struct{ cnt, val int }

// hp 定义一个堆类型，存储 tuple 元素
type hp []tuple

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法，按照概率从大到小排序
func (h hp) Less(i, j int) bool { return h[i].cnt > h[j].cnt }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(tuple)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }

package a1046

import "container/heap"

func lastStoneWeight(stones []int) int {
	h := hp(stones)
	heap.Init(&h)
	for len(h) > 1 {
		first := heap.Pop(&h).(int)
		second := heap.Pop(&h).(int)
		if first != second {
			heap.Push(&h, first-second)
		}
	}
	if len(h) == 0 {
		return 0
	}
	return h[0]
}

// hp 定义一个堆类型, 存储 tuple 元素
type hp []int

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法, 按照概率从大到小排序
func (h hp) Less(i, j int) bool { return h[i] > h[j] }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(int)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }

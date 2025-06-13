package a2335

import "container/heap"

func fillCups(amount []int) (ans int) {
	h := hp{}
	for _, x := range amount {
		if x > 0 {
			heap.Push(&h, x)
		}
	}
	for len(h) >= 2 {
		first := heap.Pop(&h).(int)
		second := heap.Pop(&h).(int)
		first -= 1
		second -= 1
		if first > 0 {
			heap.Push(&h, first)
		}
		if second > 0 {
			heap.Push(&h, second)
		}
		ans++
	}
	if len(h) > 0 {
		first := heap.Pop(&h).(int)
		ans += first
	}
	return ans
}

// hp 定义一个堆类型，存储 tuple 元素
type hp []int

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法，按照概率从大到小排序
func (h hp) Less(i, j int) bool { return h[i] > h[j] }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(int)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }
